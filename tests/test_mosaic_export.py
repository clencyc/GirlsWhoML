"""
Comprehensive unit tests for mosaic_export.py

Tests cover:
- Mosaic creation from 4 images
- Image loading from local paths and URLs
- Image resizing and positioning
- File system operations
- Edge cases and error conditions
- Series ID integration
"""

import unittest
import os
import tempfile
import shutil
from unittest.mock import patch, MagicMock, Mock, mock_open
from io import BytesIO
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestMosaicExport(unittest.TestCase):
    """Test suite for mosaic_export module."""
    
    def setUp(self):
        """Set up test fixtures before each test."""
        # Create temporary directory for test files
        self.test_dir = tempfile.mkdtemp()
        self.output_dir = os.path.join(self.test_dir, "output")
        os.makedirs(self.output_dir, exist_ok=True)
        
        # Mock PIL.Image
        self.image_patcher = patch('mosaic_export.Image')
        self.mock_image_class = self.image_patcher.start()
        
        # Create mock image instances
        self.mock_images = []
        for _ in range(4):
            mock_img = MagicMock()
            mock_img.resize.return_value = mock_img
            self.mock_images.append(mock_img)
        
        # Mock Image.open to return our mock images in sequence
        self.mock_image_class.open.side_effect = self.mock_images.copy()
        
        # Mock Image.new for mosaic creation
        self.mock_mosaic = MagicMock()
        self.mock_image_class.new.return_value = self.mock_mosaic
        
        # Mock Image.Resampling
        self.mock_image_class.Resampling.LANCZOS = 'LANCZOS'
        
        # Mock requests for URL handling
        self.requests_patcher = patch('mosaic_export.requests')
        self.mock_requests = self.requests_patcher.start()
        
        mock_response = MagicMock()
        mock_response.content = b'fake_image_data'
        mock_response.status_code = 200
        self.mock_requests.get.return_value = mock_response
    
    def tearDown(self):
        """Clean up test files and mocks after each test."""
        self.image_patcher.stop()
        self.requests_patcher.stop()
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_create_mosaic_basic_functionality(self):
        """Test basic mosaic creation with 4 local images."""
        from mosaic_export import create_mosaic
        
        image_paths = [
            os.path.join(self.test_dir, f"img{i}.png") 
            for i in range(1, 5)
        ]
        
        # Create dummy files
        for path in image_paths:
            open(path, 'w').close()
        
        output_path = os.path.join(self.output_dir, "mosaic.png")
        result = create_mosaic(image_paths, output_path=output_path)
        
        # Verify mosaic was created
        self.assertEqual(result, output_path)
        
        # Verify Image.new was called with correct size
        self.mock_image_class.new.assert_called_once_with("RGB", (1034, 1034))
        
        # Verify all images were opened
        self.assertEqual(self.mock_image_class.open.call_count, 4)
    
    def test_create_mosaic_with_series_id(self):
        """Test mosaic creation with series ID in filename."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        series_id = "H-20250001"
        
        result = create_mosaic(image_paths, series_id=series_id)
        
        # Verify filename includes series ID
        self.assertIn(series_id, result)
        self.assertTrue(result.endswith("_mosaic.png"))
    
    def test_create_mosaic_validates_image_count(self):
        """Test that create_mosaic requires exactly 4 images."""
        from mosaic_export import create_mosaic
        
        # Test with too few images
        with self.assertRaises(ValueError) as context:
            create_mosaic(["img1.png", "img2.png", "img3.png"])
        self.assertIn("Exactly 4 images required", str(context.exception))
        
        # Test with too many images
        with self.assertRaises(ValueError) as context:
            create_mosaic(["img1.png", "img2.png", "img3.png", "img4.png", "img5.png"])
        self.assertIn("Exactly 4 images required", str(context.exception))
        
        # Test with empty list
        with self.assertRaises(ValueError) as context:
            create_mosaic([])
        self.assertIn("Exactly 4 images required", str(context.exception))
    
    def test_create_mosaic_resizes_images_correctly(self):
        """Test that images are resized to 517x517 pixels."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        
        create_mosaic(image_paths, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Verify each image was resized to 517x517
        for mock_img in self.mock_images:
            mock_img.resize.assert_called_once_with((517, 517), 'LANCZOS')
    
    def test_create_mosaic_positions_images_correctly(self):
        """Test that images are pasted in correct 2x2 grid positions."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        
        create_mosaic(image_paths, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Verify paste was called 4 times with correct positions
        expected_positions = [(0, 0), (517, 0), (0, 517), (517, 517)]
        paste_calls = self.mock_mosaic.paste.call_args_list
        
        self.assertEqual(len(paste_calls), 4)
        for i, call in enumerate(paste_calls):
            actual_position = call[0][1]
            self.assertEqual(actual_position, expected_positions[i])
    
    def test_create_mosaic_saves_with_optimization(self):
        """Test that mosaic is saved with optimization enabled."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        output_path = os.path.join(self.output_dir, "mosaic.png")
        
        create_mosaic(image_paths, output_path=output_path)
        
        # Verify save was called with optimize=True
        self.mock_mosaic.save.assert_called_once()
        call_kwargs = self.mock_mosaic.save.call_args[1]
        self.assertTrue(call_kwargs.get('optimize'))
    
    def test_create_mosaic_from_urls(self):
        """Test creating mosaic from image URLs."""
        from mosaic_export import create_mosaic
        
        image_urls = [
            "https://example.com/card1.jpg",
            "https://example.com/card2.jpg",
            "https://example.com/card3.jpg",
            "https://example.com/card4.jpg"
        ]
        
        create_mosaic(image_urls, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Verify requests.get was called for each URL
        self.assertEqual(self.mock_requests.get.call_count, 4)
        
        # Verify Image.open was called with BytesIO objects
        self.assertEqual(self.mock_image_class.open.call_count, 4)
    
    def test_create_mosaic_mixed_local_and_urls(self):
        """Test creating mosaic from mix of local paths and URLs."""
        from mosaic_export import create_mosaic
        
        # Create one local file
        local_file = os.path.join(self.test_dir, "local.png")
        open(local_file, 'w').close()
        
        image_paths = [
            local_file,
            "https://example.com/card2.jpg",
            "https://example.com/card3.jpg",
            "https://example.com/card4.jpg"
        ]
        
        create_mosaic(image_paths, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Verify requests.get was called only for URLs (3 times)
        self.assertEqual(self.mock_requests.get.call_count, 3)
    
    def test_create_mosaic_creates_output_directory(self):
        """Test that output directory is created if it doesn't exist."""
        from mosaic_export import create_mosaic
        
        nested_output = os.path.join(self.test_dir, "deep", "nested", "output", "mosaic.png")
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        
        create_mosaic(image_paths, output_path=nested_output)
        
        # Verify directory structure was created
        self.assertTrue(os.path.exists(os.path.dirname(nested_output)))
    
    def test_create_mosaic_handles_image_load_error(self):
        """Test error handling when image loading fails."""
        from mosaic_export import create_mosaic
        
        # Make Image.open raise an exception
        self.mock_image_class.open.side_effect = Exception("Failed to load image")
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        
        # Should raise the exception
        with self.assertRaises(Exception) as context:
            create_mosaic(image_paths, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        self.assertIn("Failed to load image", str(context.exception))
    
    def test_create_mosaic_handles_url_request_error(self):
        """Test error handling when URL request fails."""
        from mosaic_export import create_mosaic
        
        # Make requests.get raise an exception
        self.mock_requests.get.side_effect = Exception("Connection error")
        
        image_urls = [
            "https://example.com/card1.jpg",
            "https://example.com/card2.jpg",
            "https://example.com/card3.jpg",
            "https://example.com/card4.jpg"
        ]
        
        # Should raise the exception
        with self.assertRaises(Exception) as context:
            create_mosaic(image_urls, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        self.assertIn("Connection error", str(context.exception))
    
    def test_create_mosaic_default_output_path(self):
        """Test using default output path."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        
        result = create_mosaic(image_paths)
        
        # Should use default "output/mosaic.png" path
        self.assertIn("output", result)
        self.assertTrue(result.endswith("mosaic.png"))
    
    def test_create_mosaic_with_http_urls(self):
        """Test creating mosaic from HTTP (non-HTTPS) URLs."""
        from mosaic_export import create_mosaic
        
        image_urls = [
            "http://example.com/card1.jpg",
            "http://example.com/card2.jpg",
            "http://example.com/card3.jpg",
            "http://example.com/card4.jpg"
        ]
        
        create_mosaic(image_urls, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Verify requests.get was called for HTTP URLs
        self.assertEqual(self.mock_requests.get.call_count, 4)
    
    def test_create_mosaic_output_dimensions(self):
        """Test that output mosaic has correct dimensions."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        
        create_mosaic(image_paths, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Verify mosaic was created with 1034x1034 dimensions
        self.mock_image_class.new.assert_called_once_with("RGB", (1034, 1034))
    
    def test_create_mosaic_with_none_series_id(self):
        """Test mosaic creation when series_id is None."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        output_path = os.path.join(self.output_dir, "custom_mosaic.png")
        
        result = create_mosaic(image_paths, output_path=output_path, series_id=None)
        
        # Should use provided output_path without modification
        self.assertEqual(result, output_path)
    
    def test_create_mosaic_rgb_mode(self):
        """Test that mosaic is created in RGB color mode."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        
        create_mosaic(image_paths, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Verify RGB mode was used
        call_args = self.mock_image_class.new.call_args[0]
        self.assertEqual(call_args[0], "RGB")


class TestMosaicExportIntegration(unittest.TestCase):
    """Integration tests for mosaic_export module."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        self.output_dir = os.path.join(self.test_dir, "output")
        
        # Mock PIL and requests
        self.image_patcher = patch('mosaic_export.Image')
        self.mock_image_class = self.image_patcher.start()
        
        self.mock_images = [MagicMock() for _ in range(4)]
        for mock_img in self.mock_images:
            mock_img.resize.return_value = mock_img
        
        self.mock_image_class.open.side_effect = self.mock_images.copy()
        
        self.mock_mosaic = MagicMock()
        self.mock_image_class.new.return_value = self.mock_mosaic
        self.mock_image_class.Resampling.LANCZOS = 'LANCZOS'
        
        self.requests_patcher = patch('mosaic_export.requests')
        self.mock_requests = self.requests_patcher.start()
        
        mock_response = MagicMock()
        mock_response.content = b'fake_image_data'
        self.mock_requests.get.return_value = mock_response
    
    def tearDown(self):
        """Clean up test files."""
        self.image_patcher.stop()
        self.requests_patcher.stop()
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_complete_workflow_with_series_id(self):
        """Test complete mosaic creation workflow with series ID."""
        from mosaic_export import create_mosaic
        
        # Simulate workflow: User selects 4 cards, generates series ID, creates mosaic
        user_selections = [
            "https://cdn.example.com/card1.jpg",
            "https://cdn.example.com/card2.jpg",
            "https://cdn.example.com/card3.jpg",
            "https://cdn.example.com/card4.jpg"
        ]
        series_id = "H-20250042"
        
        result = create_mosaic(user_selections, series_id=series_id)
        
        # Verify result path includes series ID
        self.assertIn(series_id, result)
        self.assertTrue(result.endswith("_mosaic.png"))
        
        # Verify all 4 images were processed
        self.assertEqual(self.mock_requests.get.call_count, 4)
        self.assertEqual(self.mock_image_class.open.call_count, 4)
    
    def test_batch_mosaic_creation(self):
        """Test creating multiple mosaics in batch."""
        from mosaic_export import create_mosaic
        
        users = [
            {"id": "H-20250001", "images": [f"url{i}.jpg" for i in range(1, 5)]},
            {"id": "H-20250002", "images": [f"url{i}.jpg" for i in range(5, 9)]},
            {"id": "H-20250003", "images": [f"url{i}.jpg" for i in range(9, 13)]},
        ]
        
        results = []
        for user in users:
            # Reset mock for each iteration
            self.mock_image_class.open.side_effect = self.mock_images.copy()
            
            result = create_mosaic(user['images'], series_id=user['id'])
            results.append(result)
        
        # Verify all mosaics were created
        self.assertEqual(len(results), 3)
        
        # Verify each has unique series ID
        for i, user in enumerate(users):
            self.assertIn(user['id'], results[i])


class TestMosaicExportEdgeCases(unittest.TestCase):
    """Test edge cases and error conditions."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        self.output_dir = os.path.join(self.test_dir, "output")
        
        # Mock PIL and requests
        self.image_patcher = patch('mosaic_export.Image')
        self.mock_image_class = self.image_patcher.start()
        
        self.mock_images = [MagicMock() for _ in range(4)]
        for mock_img in self.mock_images:
            mock_img.resize.return_value = mock_img
        
        self.mock_image_class.open.side_effect = self.mock_images.copy()
        
        self.mock_mosaic = MagicMock()
        self.mock_image_class.new.return_value = self.mock_mosaic
        self.mock_image_class.Resampling.LANCZOS = 'LANCZOS'
        
        self.requests_patcher = patch('mosaic_export.requests')
        self.mock_requests = self.requests_patcher.start()
        
        mock_response = MagicMock()
        mock_response.content = b'fake_image_data'
        self.mock_requests.get.return_value = mock_response
    
    def tearDown(self):
        """Clean up."""
        self.image_patcher.stop()
        self.requests_patcher.stop()
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_create_mosaic_with_special_chars_in_series_id(self):
        """Test mosaic creation with special characters in series ID."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        series_id = "H-2025_TEST-001"
        
        result = create_mosaic(image_paths, series_id=series_id)
        
        # Should handle special characters
        self.assertIn(series_id, result)
    
    def test_create_mosaic_handles_url_with_query_params(self):
        """Test creating mosaic from URLs with query parameters."""
        from mosaic_export import create_mosaic
        
        image_urls = [
            "https://example.com/card1.jpg?size=large&format=png",
            "https://example.com/card2.jpg?size=large&format=png",
            "https://example.com/card3.jpg?size=large&format=png",
            "https://example.com/card4.jpg?size=large&format=png"
        ]
        
        create_mosaic(image_urls, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Should handle URLs with query parameters
        self.assertEqual(self.mock_requests.get.call_count, 4)
    
    def test_create_mosaic_with_very_long_output_path(self):
        """Test creating mosaic with very long output path."""
        from mosaic_export import create_mosaic
        
        image_paths = [f"img{i}.png" for i in range(1, 5)]
        long_path = os.path.join(self.test_dir, "a" * 50, "b" * 50, "mosaic.png")
        
        result = create_mosaic(image_paths, output_path=long_path)
        
        # Should handle long paths
        self.assertEqual(result, long_path)
    
    def test_create_mosaic_handles_image_formats(self):
        """Test that mosaic creation works with different image formats."""
        from mosaic_export import create_mosaic
        
        # Test with various image extensions
        image_paths = [
            "img1.jpg",
            "img2.jpeg",
            "img3.png",
            "img4.gif"
        ]
        
        create_mosaic(image_paths, output_path=os.path.join(self.output_dir, "mosaic.png"))
        
        # Should handle different formats
        self.assertEqual(self.mock_image_class.open.call_count, 4)


if __name__ == '__main__':
    unittest.main()