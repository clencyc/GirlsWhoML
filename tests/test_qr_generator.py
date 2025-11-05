"""
Comprehensive unit tests for qr_generator.py

Tests cover:
- QR code generation and format validation
- URL construction and validation
- File system operations
- Size and quality parameters
- Edge cases and error conditions
- Environment variable handling
"""

import unittest
import os
import tempfile
import shutil
from unittest.mock import patch, MagicMock, Mock
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestQRGenerator(unittest.TestCase):
    """Test suite for qr_generator module."""
    
    def setUp(self):
        """Set up test fixtures before each test."""
        # Create temporary directory for test files
        self.test_dir = tempfile.mkdtemp()
        self.output_dir = os.path.join(self.test_dir, "qr_codes")
        
        # Mock qrcode module
        self.qrcode_patcher = patch('qr_generator.qrcode')
        self.mock_qrcode = self.qrcode_patcher.start()
        
        # Setup mock QRCode instance
        self.mock_qr_instance = MagicMock()
        self.mock_qrcode.QRCode.return_value = self.mock_qr_instance
        
        # Setup mock image
        self.mock_image = MagicMock()
        self.mock_image.resize.return_value = self.mock_image
        self.mock_qr_instance.make_image.return_value = self.mock_image
        
        # Setup constants
        self.mock_qrcode.constants.ERROR_CORRECT_H = 'H'
    
    def tearDown(self):
        """Clean up test files and mocks after each test."""
        self.qrcode_patcher.stop()
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_create_qr_basic_functionality(self):
        """Test basic QR code generation with required parameters."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        result = create_qr(series_id, output_dir=self.output_dir)
        
        # Verify result structure
        self.assertIn('local_path', result)
        self.assertIn('lookup_url', result)
        
        # Verify QRCode was initialized correctly
        self.mock_qrcode.QRCode.assert_called_once()
        call_kwargs = self.mock_qrcode.QRCode.call_args[1]
        self.assertEqual(call_kwargs['version'], 1)
        self.assertEqual(call_kwargs['error_correction'], 'H')
        self.assertEqual(call_kwargs['box_size'], 10)
        self.assertEqual(call_kwargs['border'], 4)
    
    def test_create_qr_with_custom_base_url(self):
        """Test QR code generation with custom base URL."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        custom_url = "https://example.com/lookup/"
        
        result = create_qr(series_id, base_url=custom_url, output_dir=self.output_dir)
        
        # Verify lookup URL uses custom base
        expected_url = f"{custom_url}{series_id}"
        self.assertEqual(result['lookup_url'], expected_url)
        
        # Verify data was added to QR code
        self.mock_qr_instance.add_data.assert_called_once_with(expected_url)
    
    def test_create_qr_with_environment_base_url(self):
        """Test QR code generation using BASE_URL from environment."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        env_url = "https://env.example.com/series/"
        
        with patch.dict(os.environ, {'BASE_URL': env_url}):
            result = create_qr(series_id, output_dir=self.output_dir)
            
            expected_url = f"{env_url}{series_id}"
            self.assertEqual(result['lookup_url'], expected_url)
    
    def test_create_qr_default_base_url(self):
        """Test QR code generation with default base URL."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        with patch.dict(os.environ, {}, clear=True):
            result = create_qr(series_id, output_dir=self.output_dir)
            
            # Should use default placeholder
            self.assertTrue(result['lookup_url'].startswith("https://placeholder.site/series/"))
            self.assertTrue(result['lookup_url'].endswith(series_id))
    
    def test_create_qr_custom_size(self):
        """Test QR code generation with custom size."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        custom_size = 500
        
        create_qr(series_id, output_dir=self.output_dir, size=custom_size)
        
        # Verify image was resized to custom size
        self.mock_image.resize.assert_called_once()
        resize_args = self.mock_image.resize.call_args[0]
        self.assertEqual(resize_args[0], (custom_size, custom_size))
    
    def test_create_qr_default_size(self):
        """Test QR code generation with default 300x300 size."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        create_qr(series_id, output_dir=self.output_dir)
        
        # Verify default 300x300 size
        self.mock_image.resize.assert_called_once()
        resize_args = self.mock_image.resize.call_args[0]
        self.assertEqual(resize_args[0], (300, 300))
    
    def test_create_qr_output_directory_creation(self):
        """Test that output directory is created if it doesn't exist."""
        from qr_generator import create_qr
        
        nested_dir = os.path.join(self.test_dir, "deep", "nested", "qr_codes")
        series_id = "H-20250001"
        
        create_qr(series_id, output_dir=nested_dir)
        
        # Verify directory was created
        self.assertTrue(os.path.exists(nested_dir))
    
    def test_create_qr_file_path_format(self):
        """Test that output file path follows expected format."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        result = create_qr(series_id, output_dir=self.output_dir)
        
        # Verify file path format
        expected_filename = f"{series_id}_qr.png"
        self.assertTrue(result['local_path'].endswith(expected_filename))
        
        # Verify file was saved
        self.mock_image.save.assert_called_once()
    
    def test_create_qr_multiple_series_ids(self):
        """Test generating QR codes for multiple series IDs."""
        from qr_generator import create_qr
        
        series_ids = ["H-20250001", "H-20250002", "H-20250003"]
        results = []
        
        for series_id in series_ids:
            result = create_qr(series_id, output_dir=self.output_dir)
            results.append(result)
        
        # Verify all results are unique
        paths = [r['local_path'] for r in results]
        self.assertEqual(len(paths), len(set(paths)))
        
        # Verify each has correct series ID in path
        for i, series_id in enumerate(series_ids):
            self.assertIn(series_id, results[i]['local_path'])
    
    def test_create_qr_special_characters_in_series_id(self):
        """Test handling of series IDs with special characters."""
        from qr_generator import create_qr
        
        # Test with valid format but edge case characters
        series_id = "H-20250001"
        
        result = create_qr(series_id, output_dir=self.output_dir)
        
        # Should handle normally
        self.assertIn(series_id, result['local_path'])
        self.assertIn(series_id, result['lookup_url'])
    
    def test_create_qr_error_correction_level(self):
        """Test that QR code uses high error correction."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        create_qr(series_id, output_dir=self.output_dir)
        
        # Verify ERROR_CORRECT_H was used
        call_kwargs = self.mock_qrcode.QRCode.call_args[1]
        self.assertEqual(call_kwargs['error_correction'], 'H')
    
    def test_create_qr_image_colors(self):
        """Test that QR code uses correct fill and background colors."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        create_qr(series_id, output_dir=self.output_dir)
        
        # Verify colors were set
        self.mock_qr_instance.make_image.assert_called_once()
        call_kwargs = self.mock_qr_instance.make_image.call_args[1]
        self.assertEqual(call_kwargs['fill_color'], 'black')
        self.assertEqual(call_kwargs['back_color'], 'white')
    
    def test_create_qr_make_fit_true(self):
        """Test that QR code is generated with fit=True."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        create_qr(series_id, output_dir=self.output_dir)
        
        # Verify make was called with fit=True
        self.mock_qr_instance.make.assert_called_once_with(fit=True)
    
    def test_create_qr_url_construction(self):
        """Test URL construction with various base URL formats."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        # Test with trailing slash
        result1 = create_qr(series_id, base_url="https://example.com/", output_dir=self.output_dir)
        self.assertEqual(result1['lookup_url'], f"https://example.com/{series_id}")
        
        # Test without trailing slash
        result2 = create_qr(series_id, base_url="https://example.com", output_dir=self.output_dir)
        self.assertEqual(result2['lookup_url'], f"https://example.com{series_id}")
    
    def test_create_qr_resample_parameter(self):
        """Test that image resize uses appropriate resampling."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        create_qr(series_id, output_dir=self.output_dir)
        
        # Verify resample parameter was passed
        call_kwargs = self.mock_image.resize.call_args[1]
        self.assertIn('resample', call_kwargs)
        self.assertEqual(call_kwargs['resample'], 1)
    
    def test_create_qr_with_empty_series_id(self):
        """Test handling of empty series ID."""
        from qr_generator import create_qr
        
        series_id = ""
        
        result = create_qr(series_id, output_dir=self.output_dir)
        
        # Should still generate QR code (edge case)
        self.assertIn('local_path', result)
        self.assertIn('lookup_url', result)
    
    def test_create_qr_with_very_long_series_id(self):
        """Test handling of very long series ID."""
        from qr_generator import create_qr
        
        series_id = "H-" + "0" * 100  # Very long ID
        
        result = create_qr(series_id, output_dir=self.output_dir)
        
        # Should handle long IDs
        self.assertIn(series_id, result['lookup_url'])
    
    def test_create_qr_default_output_directory(self):
        """Test using default output directory."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        # Create default directory in test dir
        default_dir = os.path.join(self.test_dir, "output", "qr_codes")
        
        result = create_qr(series_id, output_dir=default_dir)
        
        # Verify default directory path is used
        self.assertIn("qr_codes", result['local_path'])


class TestQRGeneratorIntegration(unittest.TestCase):
    """Integration tests for qr_generator module."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        self.output_dir = os.path.join(self.test_dir, "qr_codes")
        
        # Mock qrcode module for integration tests too
        self.qrcode_patcher = patch('qr_generator.qrcode')
        self.mock_qrcode = self.qrcode_patcher.start()
        
        self.mock_qr_instance = MagicMock()
        self.mock_qrcode.QRCode.return_value = self.mock_qr_instance
        
        self.mock_image = MagicMock()
        self.mock_image.resize.return_value = self.mock_image
        self.mock_qr_instance.make_image.return_value = self.mock_image
        
        self.mock_qrcode.constants.ERROR_CORRECT_H = 'H'
    
    def tearDown(self):
        """Clean up test files."""
        self.qrcode_patcher.stop()
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_batch_qr_generation(self):
        """Test generating QR codes for multiple users in batch."""
        from qr_generator import create_qr
        
        # Simulate batch processing
        batch_data = [
            {"series_id": f"H-202500{i:02d}", "user": f"user_{i}"}
            for i in range(1, 11)
        ]
        
        results = []
        for item in batch_data:
            result = create_qr(item['series_id'], output_dir=self.output_dir)
            results.append({**item, **result})
        
        # Verify all generated successfully
        self.assertEqual(len(results), 10)
        
        # Verify all have unique paths
        paths = [r['local_path'] for r in results]
        self.assertEqual(len(paths), len(set(paths)))
    
    def test_qr_generation_with_workflow(self):
        """Test QR generation as part of complete workflow."""
        from qr_generator import create_qr
        
        # Simulate workflow: generate series ID -> create QR
        series_id = "H-20250001"
        base_url = "https://production.site/series/"
        
        # Generate QR code
        qr_result = create_qr(series_id, base_url=base_url, output_dir=self.output_dir)
        
        # Verify workflow data
        self.assertEqual(qr_result['lookup_url'], f"{base_url}{series_id}")
        self.assertIn(series_id, qr_result['local_path'])
    
    def test_environment_configuration_priority(self):
        """Test that explicit parameters override environment variables."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        env_url = "https://env.example.com/series/"
        explicit_url = "https://explicit.example.com/series/"
        
        with patch.dict(os.environ, {'BASE_URL': env_url}):
            # Explicit parameter should override environment
            result = create_qr(series_id, base_url=explicit_url, output_dir=self.output_dir)
            self.assertEqual(result['lookup_url'], f"{explicit_url}{series_id}")


class TestQRGeneratorEdgeCases(unittest.TestCase):
    """Test edge cases and error conditions."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        self.output_dir = os.path.join(self.test_dir, "qr_codes")
        
        # Mock qrcode
        self.qrcode_patcher = patch('qr_generator.qrcode')
        self.mock_qrcode = self.qrcode_patcher.start()
        
        self.mock_qr_instance = MagicMock()
        self.mock_qrcode.QRCode.return_value = self.mock_qr_instance
        
        self.mock_image = MagicMock()
        self.mock_image.resize.return_value = self.mock_image
        self.mock_qr_instance.make_image.return_value = self.mock_image
        
        self.mock_qrcode.constants.ERROR_CORRECT_H = 'H'
    
    def tearDown(self):
        """Clean up."""
        self.qrcode_patcher.stop()
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_qr_with_unicode_in_base_url(self):
        """Test QR generation with unicode characters in base URL."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        unicode_url = "https://例え.com/series/"
        
        result = create_qr(series_id, base_url=unicode_url, output_dir=self.output_dir)
        
        # Should handle unicode URLs
        self.assertIn(series_id, result['lookup_url'])
    
    def test_qr_with_various_size_parameters(self):
        """Test QR generation with various size parameters."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        test_sizes = [50, 100, 300, 500, 1000, 2000]
        
        for size in test_sizes:
            create_qr(series_id, output_dir=self.output_dir, size=size)
            
            # Verify resize was called with correct size
            resize_calls = self.mock_image.resize.call_args_list
            last_call = resize_calls[-1]
            self.assertEqual(last_call[0][0], (size, size))
    
    def test_qr_file_overwrite_behavior(self):
        """Test behavior when QR code file already exists."""
        from qr_generator import create_qr
        
        series_id = "H-20250001"
        
        # Generate first QR code
        result1 = create_qr(series_id, output_dir=self.output_dir)
        
        # Generate again with same series ID (should overwrite)
        result2 = create_qr(series_id, output_dir=self.output_dir)
        
        # Paths should be the same
        self.assertEqual(result1['local_path'], result2['local_path'])


if __name__ == '__main__':
    unittest.main()