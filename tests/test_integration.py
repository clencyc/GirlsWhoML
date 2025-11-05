"""
Comprehensive unit tests for integration.py

Tests cover:
- Scene3Backend class initialization
- Complete souvenir workflow
- Backend communication and uploads
- Error handling and resilience
- Integration with mosaic, series ID, and QR modules
"""

import unittest
import os
import tempfile
import shutil
from unittest.mock import patch, MagicMock, Mock, call
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestScene3BackendInit(unittest.TestCase):
    """Test Scene3Backend initialization."""
    
    def test_init_with_default_values(self):
        """Test initialization with default environment values."""
        from integration import Scene3Backend
        
        with patch.dict(os.environ, {}, clear=True):
            backend = Scene3Backend()
            
            self.assertEqual(backend.backend_url, "http://localhost:8000")
            self.assertEqual(backend.base_url, "https://placeholder.site/series/")
    
    def test_init_with_custom_values(self):
        """Test initialization with custom parameter values."""
        from integration import Scene3Backend
        
        custom_backend = "https://api.example.com"
        custom_base = "https://example.com/lookup/"
        
        backend = Scene3Backend(backend_url=custom_backend, base_url=custom_base)
        
        self.assertEqual(backend.backend_url, custom_backend)
        self.assertEqual(backend.base_url, custom_base)
    
    def test_init_with_environment_variables(self):
        """Test initialization using environment variables."""
        from integration import Scene3Backend
        
        env_backend = "https://env-api.example.com"
        env_base = "https://env.example.com/series/"
        
        with patch.dict(os.environ, {'BACKEND_URL': env_backend, 'BASE_URL': env_base}):
            backend = Scene3Backend()
            
            self.assertEqual(backend.backend_url, env_backend)
            self.assertEqual(backend.base_url, env_base)
    
    def test_init_parameters_override_environment(self):
        """Test that explicit parameters override environment variables."""
        from integration import Scene3Backend
        
        env_backend = "https://env-api.example.com"
        param_backend = "https://param-api.example.com"
        
        with patch.dict(os.environ, {'BACKEND_URL': env_backend}):
            backend = Scene3Backend(backend_url=param_backend)
            
            self.assertEqual(backend.backend_url, param_backend)


class TestCreateCompleteSouvenir(unittest.TestCase):
    """Test create_complete_souvenir method."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        
        # Mock all external dependencies
        self.mosaic_patcher = patch('integration.create_mosaic')
        self.series_patcher = patch('integration.generate_series_id')
        self.qr_patcher = patch('integration.create_qr')
        self.requests_patcher = patch('integration.requests')
        
        self.mock_mosaic = self.mosaic_patcher.start()
        self.mock_series = self.series_patcher.start()
        self.mock_qr = self.qr_patcher.start()
        self.mock_requests = self.requests_patcher.start()
        
        # Setup return values
        self.mock_series.return_value = "H-20250001"
        self.mock_mosaic.return_value = os.path.join(self.test_dir, "H-20250001_mosaic.png")
        self.mock_qr.return_value = {
            'local_path': os.path.join(self.test_dir, "H-20250001_qr.png"),
            'lookup_url': "https://example.com/series/H-20250001"
        }
        
        # Setup mock response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'id': 42,
            'mosaic_url': 'https://cloudinary.com/mosaic.png',
            'screenshot_url': 'https://cloudinary.com/screenshot.png'
        }
        self.mock_requests.post.return_value = mock_response
        
        # Create dummy mosaic file for file operations
        mosaic_path = os.path.join(self.test_dir, "H-20250001_mosaic.png")
        with open(mosaic_path, 'wb') as f:
            f.write(b'fake_mosaic_data')
    
    def tearDown(self):
        """Clean up mocks and temp files."""
        self.mosaic_patcher.stop()
        self.series_patcher.stop()
        self.qr_patcher.stop()
        self.requests_patcher.stop()
        
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_create_complete_souvenir_happy_path(self):
        """Test complete successful workflow."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        image_urls = [
            "https://example.com/card1.jpg",
            "https://example.com/card2.jpg",
            "https://example.com/card3.jpg",
            "https://example.com/card4.jpg"
        ]
        
        result = backend.create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify all steps were called
        self.mock_series.assert_called_once()
        self.mock_mosaic.assert_called_once()
        self.mock_qr.assert_called_once()
        self.mock_requests.post.assert_called_once()
        
        # Verify result structure
        self.assertEqual(result['series_id'], "H-20250001")
        self.assertTrue(result['backend_saved'])
        self.assertEqual(result['backend_id'], 42)
        self.assertIn('mosaic', result)
        self.assertIn('qr_code', result)
    
    def test_create_complete_souvenir_validates_image_count(self):
        """Test that exactly 4 images are required."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        # Test with 3 images
        with self.assertRaises(ValueError) as context:
            backend.create_complete_souvenir(
                image_urls=["url1", "url2", "url3"],
                name="Test",
                country="Country"
            )
        self.assertIn("Expected 4 images", str(context.exception))
        
        # Test with None
        with self.assertRaises(ValueError) as context:
            backend.create_complete_souvenir(
                image_urls=None,
                name="Test",
                country="Country"
            )
        self.assertIn("Expected 4 images", str(context.exception))
    
    def test_create_complete_souvenir_with_screenshot(self):
        """Test workflow with screenshot URL from Scene 1."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        screenshot_url = "https://example.com/screenshot.png"
        
        # Mock screenshot download
        screenshot_response = MagicMock()
        screenshot_response.status_code = 200
        screenshot_response.content = b'fake_screenshot_data'
        
        self.mock_requests.get.return_value = screenshot_response
        
        result = backend.create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            screenshot_url=screenshot_url
        )
        
        # Verify screenshot was downloaded
        self.mock_requests.get.assert_called_once_with(screenshot_url, timeout=15)
        
        # Verify result includes backend data
        self.assertTrue(result['backend_saved'])
    
    def test_create_complete_souvenir_screenshot_download_failure(self):
        """Test handling of screenshot download failure."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        screenshot_url = "https://example.com/screenshot.png"
        
        # Mock failed screenshot download
        screenshot_response = MagicMock()
        screenshot_response.status_code = 404
        self.mock_requests.get.return_value = screenshot_response
        
        # Should not raise exception, just continue
        result = backend.create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            screenshot_url=screenshot_url
        )
        
        # Workflow should complete despite screenshot failure
        self.assertIn('series_id', result)
    
    def test_create_complete_souvenir_backend_upload_failure(self):
        """Test handling when backend upload fails."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        # Mock failed backend response
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.text = "Internal Server Error"
        self.mock_requests.post.return_value = mock_response
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        result = backend.create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify result indicates backend not saved
        self.assertFalse(result['backend_saved'])
        self.assertIsNone(result['backend_id'])
        
        # But local files should still be created
        self.assertIn('series_id', result)
        self.assertIn('mosaic', result)
        self.assertIn('qr_code', result)
    
    def test_create_complete_souvenir_backend_connection_error(self):
        """Test handling when backend is unreachable."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        # Mock connection error
        self.mock_requests.post.side_effect = Exception("Connection refused")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        result = backend.create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Should handle gracefully
        self.assertFalse(result['backend_saved'])
        self.assertIsNone(result['backend_id'])
    
    def test_create_complete_souvenir_mosaic_creation_failure(self):
        """Test handling when mosaic creation fails."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        # Mock mosaic creation failure
        self.mock_mosaic.side_effect = Exception("Failed to create mosaic")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        # Should propagate the exception
        with self.assertRaises(Exception) as context:
            backend.create_complete_souvenir(
                image_urls=image_urls,
                name="Test User",
                country="Tunisia"
            )
        self.assertIn("Failed to create mosaic", str(context.exception))
    
    def test_create_complete_souvenir_passes_correct_data_to_modules(self):
        """Test that correct data is passed to mosaic, series ID, and QR modules."""
        from integration import Scene3Backend
        
        backend = Scene3Backend(base_url="https://custom.site/series/")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        backend.create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify mosaic received correct parameters
        self.mock_mosaic.assert_called_once_with(
            image_paths=image_urls,
            series_id="H-20250001"
        )
        
        # Verify QR code received correct parameters
        self.mock_qr.assert_called_once_with(
            "H-20250001",
            base_url="https://custom.site/series/"
        )


class TestUploadToBackend(unittest.TestCase):
    """Test _upload_to_backend method."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        self.mosaic_path = os.path.join(self.test_dir, "H-20250001_mosaic.png")
        
        # Create dummy mosaic file
        with open(self.mosaic_path, 'wb') as f:
            f.write(b'fake_mosaic_data')
        
        # Mock requests
        self.requests_patcher = patch('integration.requests')
        self.mock_requests = self.requests_patcher.start()
        
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'id': 42,
            'mosaic_url': 'https://cloudinary.com/mosaic.png'
        }
        self.mock_requests.post.return_value = mock_response
        self.mock_requests.get.return_value = MagicMock(status_code=200, content=b'screenshot')
    
    def tearDown(self):
        """Clean up."""
        self.requests_patcher.stop()
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_upload_includes_series_id(self):
        """Test that series_id is included in form data."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        backend._upload_to_backend(
            mosaic_path=self.mosaic_path,
            name="Test User",
            country="Tunisia",
            series_id="H-20250001"
        )
        
        # Verify POST was called
        self.mock_requests.post.assert_called_once()
        
        # Verify series_id in data
        call_kwargs = self.mock_requests.post.call_args[1]
        self.assertEqual(call_kwargs['data']['series_id'], "H-20250001")
    
    def test_upload_includes_mosaic_file(self):
        """Test that mosaic file is included in upload."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        backend._upload_to_backend(
            mosaic_path=self.mosaic_path,
            name="Test User",
            country="Tunisia",
            series_id="H-20250001"
        )
        
        # Verify files were included
        call_kwargs = self.mock_requests.post.call_args[1]
        self.assertIn('mosaic', call_kwargs['files'])
    
    def test_upload_downloads_and_includes_screenshot(self):
        """Test that screenshot is downloaded and included when URL provided."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        screenshot_url = "https://example.com/screenshot.png"
        
        backend._upload_to_backend(
            mosaic_path=self.mosaic_path,
            name="Test User",
            country="Tunisia",
            series_id="H-20250001",
            screenshot_url=screenshot_url
        )
        
        # Verify screenshot was downloaded
        self.mock_requests.get.assert_called_once_with(screenshot_url, timeout=15)
        
        # Verify screenshot was included in files
        call_kwargs = self.mock_requests.post.call_args[1]
        self.assertIn('screenshot', call_kwargs['files'])
    
    def test_upload_handles_screenshot_download_failure(self):
        """Test graceful handling of screenshot download failure."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        # Mock failed screenshot download
        self.mock_requests.get.side_effect = Exception("Download failed")
        
        result = backend._upload_to_backend(
            mosaic_path=self.mosaic_path,
            name="Test User",
            country="Tunisia",
            series_id="H-20250001",
            screenshot_url="https://example.com/screenshot.png"
        )
        
        # Should continue without screenshot
        self.assertIsNotNone(result)
    
    def test_upload_returns_none_on_non_200_status(self):
        """Test that None is returned when backend returns non-200 status."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        mock_response = MagicMock()
        mock_response.status_code = 400
        mock_response.text = "Bad Request"
        self.mock_requests.post.return_value = mock_response
        
        result = backend._upload_to_backend(
            mosaic_path=self.mosaic_path,
            name="Test User",
            country="Tunisia",
            series_id="H-20250001"
        )
        
        self.assertIsNone(result)
    
    def test_upload_uses_correct_endpoint(self):
        """Test that correct backend endpoint is used."""
        from integration import Scene3Backend
        
        backend_url = "https://api.example.com"
        backend = Scene3Backend(backend_url=backend_url)
        
        backend._upload_to_backend(
            mosaic_path=self.mosaic_path,
            name="Test User",
            country="Tunisia",
            series_id="H-20250001"
        )
        
        # Verify correct endpoint was called
        expected_endpoint = f"{backend_url}/contributors/"
        self.mock_requests.post.assert_called_once()
        actual_endpoint = self.mock_requests.post.call_args[0][0]
        self.assertEqual(actual_endpoint, expected_endpoint)
    
    def test_upload_uses_60_second_timeout(self):
        """Test that upload uses 60-second timeout for Cloudinary upload."""
        from integration import Scene3Backend
        
        backend = Scene3Backend()
        
        backend._upload_to_backend(
            mosaic_path=self.mosaic_path,
            name="Test User",
            country="Tunisia",
            series_id="H-20250001"
        )
        
        # Verify timeout was set
        call_kwargs = self.mock_requests.post.call_args[1]
        self.assertEqual(call_kwargs['timeout'], 60)


class TestCreateSouvenirFunction(unittest.TestCase):
    """Test standalone create_souvenir function."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.backend_patcher = patch('integration.Scene3Backend')
        self.mock_backend_class = self.backend_patcher.start()
        
        self.mock_backend_instance = MagicMock()
        self.mock_backend_class.return_value = self.mock_backend_instance
        
        self.mock_backend_instance.create_complete_souvenir.return_value = {
            'series_id': 'H-20250001',
            'backend_saved': True
        }
    
    def tearDown(self):
        """Clean up."""
        self.backend_patcher.stop()
    
    def test_create_souvenir_creates_backend_instance(self):
        """Test that create_souvenir creates Scene3Backend instance."""
        from integration import create_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        create_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify backend was instantiated
        self.mock_backend_class.assert_called_once()
    
    def test_create_souvenir_passes_parameters(self):
        """Test that parameters are correctly passed through."""
        from integration import create_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        screenshot_url = "https://example.com/screenshot.png"
        backend_url = "https://api.example.com"
        base_url = "https://example.com/series/"
        
        create_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            screenshot_url=screenshot_url,
            backend_url=backend_url,
            base_url=base_url
        )
        
        # Verify backend initialization parameters
        self.mock_backend_class.assert_called_once_with(
            backend_url=backend_url,
            base_url=base_url
        )
        
        # Verify create_complete_souvenir was called
        self.mock_backend_instance.create_complete_souvenir.assert_called_once_with(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            screenshot_url=screenshot_url
        )


if __name__ == '__main__':
    unittest.main()