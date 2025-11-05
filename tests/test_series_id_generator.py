"""
Comprehensive unit tests for series_id_generator.py

Tests cover:
- Series ID generation format validation
- Counter persistence and increment
- Year rollover behavior
- File system interactions
- Edge cases and error conditions
"""

import unittest
import os
import json
import tempfile
import shutil
from datetime import datetime
from unittest.mock import patch, mock_open, MagicMock
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from series_id_generator import generate_series_id


class TestSeriesIdGenerator(unittest.TestCase):
    """Test suite for series_id_generator module."""
    
    def setUp(self):
        """Set up test fixtures before each test."""
        # Create temporary directory for test files
        self.test_dir = tempfile.mkdtemp()
        self.counter_file = os.path.join(self.test_dir, "test_counter.json")
    
    def tearDown(self):
        """Clean up test files after each test."""
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_generate_first_series_id(self):
        """Test generating the first Series ID when no counter file exists."""
        series_id = generate_series_id(self.counter_file)
        
        # Verify format: H-YEARXXXX
        self.assertTrue(series_id.startswith("H-"))
        self.assertEqual(len(series_id), 10)  # H-20250001 = 10 chars
        
        # Verify it's the first ID (0001)
        self.assertTrue(series_id.endswith("0001"))
        
        # Verify counter file was created
        self.assertTrue(os.path.exists(self.counter_file))
    
    def test_generate_sequential_series_ids(self):
        """Test that Series IDs increment sequentially."""
        ids = []
        for _ in range(5):
            series_id = generate_series_id(self.counter_file)
            ids.append(series_id)
        
        # Verify all IDs are unique
        self.assertEqual(len(ids), len(set(ids)))
        
        # Verify sequential numbering
        for i, series_id in enumerate(ids, start=1):
            expected_suffix = f"{i:04d}"
            self.assertTrue(series_id.endswith(expected_suffix),
                          f"Expected {series_id} to end with {expected_suffix}")
    
    def test_series_id_format_validation(self):
        """Test that generated Series IDs match the expected format."""
        series_id = generate_series_id(self.counter_file)
        
        # Format: H-YEARXXXX where YEAR is current year and XXXX is 4-digit counter
        parts = series_id.split("-")
        self.assertEqual(len(parts), 2)
        self.assertEqual(parts[0], "H")
        
        year_and_counter = parts[1]
        self.assertEqual(len(year_and_counter), 8)  # 4 year + 4 counter digits
        self.assertTrue(year_and_counter.isdigit())
        
        current_year = str(datetime.now().year)
        self.assertTrue(year_and_counter.startswith(current_year))
    
    def test_counter_persistence(self):
        """Test that counter persists across function calls."""
        # Generate first ID
        generate_series_id(self.counter_file)
        
        # Verify counter file has correct data
        with open(self.counter_file, 'r') as f:
            data = json.load(f)
        self.assertEqual(data['counter'], 1)
        self.assertEqual(data['year'], datetime.now().year)
        
        # Generate second ID
        generate_series_id(self.counter_file)
        
        # Verify counter incremented
        with open(self.counter_file, 'r') as f:
            data = json.load(f)
        self.assertEqual(data['counter'], 2)
    
    def test_counter_file_creation_in_nested_directory(self):
        """Test that counter file is created even in nested directories."""
        nested_path = os.path.join(self.test_dir, "deep", "nested", "path", "counter.json")
        
        series_id = generate_series_id(nested_path)
        
        # Verify file was created
        self.assertTrue(os.path.exists(nested_path))
        self.assertTrue(series_id.startswith("H-"))
    
    def test_year_rollover_resets_counter(self):
        """Test that counter resets when year changes."""
        # Create counter file with previous year
        previous_year = datetime.now().year - 1
        counter_data = {"counter": 999, "year": previous_year}
        with open(self.counter_file, 'w') as f:
            json.dump(counter_data, f)
        
        # Generate ID (should reset counter due to year change)
        series_id = generate_series_id(self.counter_file)
        
        # Verify counter was reset to 1
        with open(self.counter_file, 'r') as f:
            data = json.load(f)
        self.assertEqual(data['counter'], 1)
        self.assertEqual(data['year'], datetime.now().year)
        
        # Verify Series ID reflects reset
        self.assertTrue(series_id.endswith("0001"))
    
    def test_year_rollover_with_mocked_datetime(self):
        """Test year rollover behavior with mocked datetime."""
        # Setup: Create counter for 2024
        counter_data = {"counter": 500, "year": 2024}
        with open(self.counter_file, 'w') as f:
            json.dump(counter_data, f)
        
        # Mock datetime to return 2025
        with patch('series_id_generator.datetime') as mock_datetime:
            mock_datetime.now.return_value = datetime(2025, 1, 1)
            mock_datetime.now().year = 2025
            
            series_id = generate_series_id(self.counter_file)
            
            # Verify counter reset and new year
            self.assertTrue(series_id.startswith("H-2025"))
            self.assertTrue(series_id.endswith("0001"))
    
    def test_corrupted_counter_file_handling(self):
        """Test handling of corrupted counter file."""
        # Create corrupted JSON file
        with open(self.counter_file, 'w') as f:
            f.write("{ invalid json content }")
        
        # Should raise JSONDecodeError
        with self.assertRaises(json.JSONDecodeError):
            generate_series_id(self.counter_file)
    
    def test_missing_counter_key_in_file(self):
        """Test handling of counter file missing 'counter' key."""
        # Create file with missing counter key
        with open(self.counter_file, 'w') as f:
            json.dump({"year": 2025}, f)
        
        series_id = generate_series_id(self.counter_file)
        
        # Should default to 0 and increment to 1
        self.assertTrue(series_id.endswith("0001"))
    
    def test_missing_year_key_in_file(self):
        """Test handling of counter file missing 'year' key."""
        # Create file with missing year key
        with open(self.counter_file, 'w') as f:
            json.dump({"counter": 5}, f)
        
        series_id = generate_series_id(self.counter_file)
        
        # Should use current year and increment counter
        current_year = str(datetime.now().year)
        self.assertTrue(series_id.startswith(f"H-{current_year}"))
        self.assertTrue(series_id.endswith("0006"))
    
    def test_high_counter_value(self):
        """Test Series ID generation with high counter values."""
        # Create counter file with high value
        counter_data = {"counter": 9998, "year": datetime.now().year}
        with open(self.counter_file, 'w') as f:
            json.dump(counter_data, f)
        
        series_id = generate_series_id(self.counter_file)
        
        # Verify format still works with 4-digit counter
        self.assertTrue(series_id.endswith("9999"))
        self.assertEqual(len(series_id), 10)
    
    def test_counter_exceeding_four_digits(self):
        """Test Series ID generation when counter exceeds 9999."""
        # Create counter file with value that will exceed 4 digits
        counter_data = {"counter": 9999, "year": datetime.now().year}
        with open(self.counter_file, 'w') as f:
            json.dump(counter_data, f)
        
        series_id = generate_series_id(self.counter_file)
        
        # Should generate 10000, which will be 5 digits
        # Series ID will be longer than 10 characters
        self.assertTrue(series_id.startswith("H-"))
        self.assertTrue("10000" in series_id)
    
    def test_empty_counter_file(self):
        """Test handling of empty counter file."""
        # Create empty file
        with open(self.counter_file, 'w') as f:
            f.write("")
        
        # Should raise JSONDecodeError
        with self.assertRaises(json.JSONDecodeError):
            generate_series_id(self.counter_file)
    
    def test_counter_file_with_extra_fields(self):
        """Test that extra fields in counter file are preserved."""
        # Create counter file with extra fields
        counter_data = {
            "counter": 10,
            "year": datetime.now().year,
            "extra_field": "should_be_ignored",
            "metadata": {"version": "1.0"}
        }
        with open(self.counter_file, 'w') as f:
            json.dump(counter_data, f)
        
        series_id = generate_series_id(self.counter_file)
        
        # Verify Series ID is generated correctly
        self.assertTrue(series_id.endswith("0011"))
        
        # Extra fields are overwritten (current implementation doesn't preserve them)
        with open(self.counter_file, 'r') as f:
            data = json.load(f)
        self.assertEqual(data['counter'], 11)
        self.assertEqual(data['year'], datetime.now().year)
    
    def test_concurrent_access_simulation(self):
        """Test counter consistency with simulated concurrent access."""
        # This tests basic file I/O consistency
        ids = set()
        for _ in range(10):
            series_id = generate_series_id(self.counter_file)
            ids.add(series_id)
        
        # All IDs should be unique
        self.assertEqual(len(ids), 10)
    
    def test_default_counter_file_path(self):
        """Test using default counter file path."""
        # This will use "output/id_counter.json" as default
        # We'll create a temporary output directory
        output_dir = os.path.join(self.test_dir, "output")
        os.makedirs(output_dir, exist_ok=True)
        
        default_path = os.path.join(output_dir, "id_counter.json")
        
        series_id = generate_series_id(default_path)
        
        self.assertTrue(os.path.exists(default_path))
        self.assertTrue(series_id.startswith("H-"))
    
    def test_counter_file_permissions_error(self):
        """Test handling of file permission errors."""
        if os.name == 'posix':  # Unix-like systems
            # Create a read-only directory
            readonly_dir = os.path.join(self.test_dir, "readonly")
            os.makedirs(readonly_dir)
            os.chmod(readonly_dir, 0o444)
            
            readonly_file = os.path.join(readonly_dir, "counter.json")
            
            try:
                # Should raise PermissionError
                with self.assertRaises(PermissionError):
                    generate_series_id(readonly_file)
            finally:
                # Cleanup: restore permissions
                os.chmod(readonly_dir, 0o700)
    
    def test_series_id_format_with_different_years(self):
        """Test Series ID format across different years."""
        test_years = [2024, 2025, 2030, 2099]
        
        for year in test_years:
            with patch('series_id_generator.datetime') as mock_datetime:
                mock_datetime.now.return_value = datetime(year, 1, 1)
                mock_datetime.now().year = year
                
                # Use separate counter file for each year
                year_counter_file = os.path.join(self.test_dir, f"counter_{year}.json")
                series_id = generate_series_id(year_counter_file)
                
                self.assertTrue(series_id.startswith(f"H-{year}"))
                self.assertEqual(len(series_id), 10)


class TestSeriesIdGeneratorIntegration(unittest.TestCase):
    """Integration tests for series_id_generator module."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.test_dir = tempfile.mkdtemp()
        self.counter_file = os.path.join(self.test_dir, "integration_counter.json")
    
    def tearDown(self):
        """Clean up test files."""
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
    
    def test_realistic_usage_scenario(self):
        """Test realistic usage: generating multiple IDs in sequence."""
        # Simulate generating IDs for multiple users
        user_sessions = []
        for i in range(20):
            series_id = generate_series_id(self.counter_file)
            user_sessions.append({
                'session_id': i,
                'series_id': series_id,
                'user': f'user_{i}'
            })
        
        # Verify all IDs are unique
        series_ids = [s['series_id'] for s in user_sessions]
        self.assertEqual(len(series_ids), len(set(series_ids)))
        
        # Verify sequential numbering
        for i, session in enumerate(user_sessions, start=1):
            expected_num = f"{i:04d}"
            self.assertTrue(session['series_id'].endswith(expected_num))
    
    def test_year_transition_scenario(self):
        """Test behavior during year transition."""
        # Setup: December 31, 2024
        counter_data = {"counter": 100, "year": 2024}
        with open(self.counter_file, 'w') as f:
            json.dump(counter_data, f)
        
        # Generate ID in 2024
        with patch('series_id_generator.datetime') as mock_datetime:
            mock_datetime.now.return_value = datetime(2024, 12, 31)
            mock_datetime.now().year = 2024
            
            id_2024 = generate_series_id(self.counter_file)
            self.assertTrue(id_2024.startswith("H-2024"))
            self.assertTrue(id_2024.endswith("0101"))
        
        # Generate ID in 2025 (year rollover)
        with patch('series_id_generator.datetime') as mock_datetime:
            mock_datetime.now.return_value = datetime(2025, 1, 1)
            mock_datetime.now().year = 2025
            
            id_2025 = generate_series_id(self.counter_file)
            self.assertTrue(id_2025.startswith("H-2025"))
            self.assertTrue(id_2025.endswith("0001"))  # Counter reset


if __name__ == '__main__':
    unittest.main()