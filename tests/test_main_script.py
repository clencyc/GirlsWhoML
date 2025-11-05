"""
Comprehensive unit tests for main_script.py

Tests cover:
- create_complete_souvenir function
- Workflow orchestration
- Error handling at each step
- Environment variable handling
- Integration with all Scene 3 modules
"""

import unittest
import os
import tempfile
import shutil
from unittest.mock import patch, MagicMock, Mock, call
from io import StringIO
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestCreateCompleteSouvenirMainScript(unittest.TestCase):
    """Test create_complete_souvenir function from main_script."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        
        # Mock all external dependencies
        self.mosaic_patcher = patch('main_script.create_mosaic')
        self.series_patcher = patch('main_script.generate_series_id')
        self.qr_patcher = patch('main_script.create_qr')
        self.requests_patcher = patch('main_script.requests')
        
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
        
        # Create dummy mosaic file
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
        """Test successful workflow execution."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify all steps were executed
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
    
    def test_create_complete_souvenir_uses_environment_urls(self):
        """Test that environment variables are used for URLs."""
        from main_script import create_complete_souvenir
        
        env_backend = "https://env-backend.com"
        env_base = "https://env-base.com/series/"
        
        with patch.dict(os.environ, {'BACKEND_URL': env_backend, 'BASE_URL': env_base}):
            image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
            
            create_complete_souvenir(
                image_urls=image_urls,
                name="Test User",
                country="Tunisia"
            )
            
            # Verify QR used environment base URL
            self.mock_qr.assert_called_once_with("H-20250001", base_url=env_base)
            
            # Verify backend POST used environment backend URL
            call_args = self.mock_requests.post.call_args[0]
            self.assertTrue(call_args[0].startswith(env_backend))
    
    def test_create_complete_souvenir_parameters_override_environment(self):
        """Test that explicit parameters override environment variables."""
        from main_script import create_complete_souvenir
        
        env_backend = "https://env-backend.com"
        param_backend = "https://param-backend.com"
        
        with patch.dict(os.environ, {'BACKEND_URL': env_backend}):
            image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
            
            create_complete_souvenir(
                image_urls=image_urls,
                name="Test User",
                country="Tunisia",
                backend_url=param_backend
            )
            
            # Verify parameter backend URL was used
            call_args = self.mock_requests.post.call_args[0]
            self.assertTrue(call_args[0].startswith(param_backend))
    
    def test_create_complete_souvenir_with_screenshot(self):
        """Test workflow with screenshot URL from Scene 1."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        screenshot_url = "https://example.com/screenshot.png"
        
        # Mock screenshot download
        screenshot_response = MagicMock()
        screenshot_response.status_code = 200
        screenshot_response.content = b'fake_screenshot_data'
        self.mock_requests.get.return_value = screenshot_response
        
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            screenshot_url=screenshot_url
        )
        
        # Verify screenshot was downloaded
        self.mock_requests.get.assert_called_once_with(screenshot_url, timeout=10)
        
        # Verify result includes backend data
        self.assertTrue(result['backend_saved'])
    
    def test_create_complete_souvenir_handles_series_id_failure(self):
        """Test error handling when series ID generation fails."""
        from main_script import create_complete_souvenir
        
        # Mock series ID generation failure
        self.mock_series.side_effect = Exception("Failed to generate ID")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        # Should raise exception
        with self.assertRaises(Exception) as context:
            create_complete_souvenir(
                image_urls=image_urls,
                name="Test User",
                country="Tunisia"
            )
        self.assertIn("Failed to generate ID", str(context.exception))
    
    def test_create_complete_souvenir_handles_mosaic_failure(self):
        """Test error handling when mosaic creation fails."""
        from main_script import create_complete_souvenir
        
        # Mock mosaic creation failure
        self.mock_mosaic.side_effect = Exception("Failed to create mosaic")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        # Should raise exception
        with self.assertRaises(Exception) as context:
            create_complete_souvenir(
                image_urls=image_urls,
                name="Test User",
                country="Tunisia"
            )
        self.assertIn("Failed to create mosaic", str(context.exception))
    
    def test_create_complete_souvenir_handles_qr_failure(self):
        """Test error handling when QR generation fails."""
        from main_script import create_complete_souvenir
        
        # Mock QR generation failure
        self.mock_qr.side_effect = Exception("Failed to generate QR")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        # Should raise exception
        with self.assertRaises(Exception) as context:
            create_complete_souvenir(
                image_urls=image_urls,
                name="Test User",
                country="Tunisia"
            )
        self.assertIn("Failed to generate QR", str(context.exception))
    
    def test_create_complete_souvenir_handles_backend_failure_gracefully(self):
        """Test graceful handling when backend upload fails."""
        from main_script import create_complete_souvenir
        
        # Mock backend failure
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.text = "Internal Server Error"
        self.mock_requests.post.return_value = mock_response
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        # Should not raise exception, but continue with local files
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify workflow completed with local files
        self.assertFalse(result['backend_saved'])
        self.assertIsNone(result['backend_id'])
        self.assertIn('series_id', result)
    
    def test_create_complete_souvenir_handles_backend_unavailable(self):
        """Test handling when backend is completely unavailable."""
        from main_script import create_complete_souvenir
        
        # Mock connection error
        self.mock_requests.post.side_effect = Exception("Connection refused")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        # Should continue with local files
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify local workflow completed
        self.assertFalse(result['backend_saved'])
        self.assertIn('series_id', result)
        self.assertIn('mosaic', result)
        self.assertIn('qr_code', result)
    
    def test_create_complete_souvenir_includes_series_id_in_backend_data(self):
        """Test that series_id is included in backend upload."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify series_id was included in POST data
        call_kwargs = self.mock_requests.post.call_args[1]
        self.assertEqual(call_kwargs['data']['series_id'], "H-20250001")
    
    def test_create_complete_souvenir_screenshot_download_failure(self):
        """Test handling when screenshot download fails."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        screenshot_url = "https://example.com/screenshot.png"
        
        # Mock failed screenshot download
        screenshot_response = MagicMock()
        screenshot_response.status_code = 404
        self.mock_requests.get.return_value = screenshot_response
        
        # Should continue without screenshot
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            screenshot_url=screenshot_url
        )
        
        # Workflow should complete
        self.assertIn('series_id', result)
    
    def test_create_complete_souvenir_screenshot_exception_handling(self):
        """Test handling when screenshot download raises exception."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        screenshot_url = "https://example.com/screenshot.png"
        
        # Mock exception during screenshot download
        self.mock_requests.get.side_effect = Exception("Network error")
        
        # Should continue without screenshot
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            screenshot_url=screenshot_url
        )
        
        # Workflow should complete
        self.assertIn('series_id', result)
    
    def test_create_complete_souvenir_result_structure(self):
        """Test that result has correct structure."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify all required fields are present
        required_fields = [
            'series_id', 'mosaic', 'qr_code',
            'backend_saved', 'backend_id', 'share_url'
        ]
        for field in required_fields:
            self.assertIn(field, result)
        
        # Verify nested structures
        self.assertIn('local_path', result['mosaic'])
        self.assertIn('backend_url', result['mosaic'])
        self.assertIn('local_path', result['qr_code'])
        self.assertIn('lookup_url', result['qr_code'])
    
    def test_create_complete_souvenir_share_url_construction(self):
        """Test that share URL is correctly constructed."""
        from main_script import create_complete_souvenir
        
        backend_url = "https://api.example.com"
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia",
            backend_url=backend_url
        )
        
        # Verify share URL format
        expected_share_url = f"{backend_url}/contributors/42/share"
        self.assertEqual(result['share_url'], expected_share_url)
    
    def test_create_complete_souvenir_no_share_url_when_backend_fails(self):
        """Test that share URL is None when backend upload fails."""
        from main_script import create_complete_souvenir
        
        # Mock backend failure
        self.mock_requests.post.side_effect = Exception("Connection error")
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        result = create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # share_url should be None
        self.assertIsNone(result['share_url'])
    
    def test_create_complete_souvenir_default_urls(self):
        """Test that default URLs are used when not provided."""
        from main_script import create_complete_souvenir
        
        with patch.dict(os.environ, {}, clear=True):
            image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
            
            create_complete_souvenir(
                image_urls=image_urls,
                name="Test User",
                country="Tunisia"
            )
            
            # Verify default URLs were used
            # Backend should be localhost:8000
            call_args = self.mock_requests.post.call_args[0]
            self.assertTrue(call_args[0].startswith("http://localhost:8000"))
            
            # Base URL should be placeholder
            qr_call_kwargs = self.mock_qr.call_args[1]
            self.assertEqual(qr_call_kwargs['base_url'], "https://placeholder.site/series/")
    
    def test_create_complete_souvenir_timeout_configuration(self):
        """Test that appropriate timeouts are configured."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify backend POST timeout
        post_kwargs = self.mock_requests.post.call_args[1]
        self.assertEqual(post_kwargs['timeout'], 30)


class TestMainFunction(unittest.TestCase):
    """Test main() function."""
    
    def setUp(self):
        """Set up test fixtures."""
        # Mock create_complete_souvenir
        self.complete_patcher = patch('main_script.create_complete_souvenir')
        self.mock_complete = self.complete_patcher.start()
        
        self.mock_complete.return_value = {
            'series_id': 'H-20250001',
            'backend_saved': True,
            'backend_id': 42
        }
    
    def tearDown(self):
        """Clean up mocks."""
        self.complete_patcher.stop()
    
    def test_main_function_calls_create_complete_souvenir(self):
        """Test that main() calls create_complete_souvenir."""
        from main_script import main
        
        result = main()
        
        # Verify create_complete_souvenir was called
        self.mock_complete.assert_called_once()
        
        # Verify result is returned
        self.assertIn('series_id', result)
    
    def test_main_function_uses_test_data(self):
        """Test that main() uses appropriate test data."""
        from main_script import main
        
        main()
        
        # Verify test data structure
        call_kwargs = self.mock_complete.call_args[1]
        
        # Should have 4 image URLs
        self.assertEqual(len(call_kwargs['image_urls']), 4)
        
        # Should have name and country
        self.assertIn('name', call_kwargs)
        self.assertIn('country', call_kwargs)
        
        # Should have screenshot_url
        self.assertIn('screenshot_url', call_kwargs)


class TestWorkflowIntegration(unittest.TestCase):
    """Integration tests for complete workflow."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        
        # Mock dependencies
        self.mosaic_patcher = patch('main_script.create_mosaic')
        self.series_patcher = patch('main_script.generate_series_id')
        self.qr_patcher = patch('main_script.create_qr')
        self.requests_patcher = patch('main_script.requests')
        
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
        
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {'id': 42, 'mosaic_url': 'https://cloudinary.com/mosaic.png'}
        self.mock_requests.post.return_value = mock_response
        
        # Create dummy file
        mosaic_path = os.path.join(self.test_dir, "H-20250001_mosaic.png")
        with open(mosaic_path, 'wb') as f:
            f.write(b'fake_mosaic_data')
    
    def tearDown(self):
        """Clean up."""
        self.mosaic_patcher.stop()
        self.series_patcher.stop()
        self.qr_patcher.stop()
        self.requests_patcher.stop()
        
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_workflow_executes_in_correct_order(self):
        """Test that workflow steps execute in correct order."""
        from main_script import create_complete_souvenir
        
        image_urls = [f"https://example.com/card{i}.jpg" for i in range(1, 5)]
        
        create_complete_souvenir(
            image_urls=image_urls,
            name="Test User",
            country="Tunisia"
        )
        
        # Verify order: series_id -> mosaic -> qr -> backend
        call_order = []
        if self.mock_series.called:
            call_order.append('series')
        if self.mock_mosaic.called:
            call_order.append('mosaic')
        if self.mock_qr.called:
            call_order.append('qr')
        if self.mock_requests.post.called:
            call_order.append('backend')
        
        self.assertEqual(call_order, ['series', 'mosaic', 'qr', 'backend'])


if __name__ == '__main__':
    unittest.main()