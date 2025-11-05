# Scene 3 Unit Tests

Comprehensive unit test suite for Scene 3 backend integration components.

## Test Coverage

### `test_series_id_generator.py`
- Series ID generation and format validation
- Counter persistence and increment logic
- Year rollover behavior
- File system operations
- Edge cases (corrupted files, missing keys, high counters)
- **Total: 25+ test cases**

### `test_qr_generator.py`
- QR code generation with various parameters
- URL construction and validation
- Size and quality parameters
- Environment variable handling
- Error conditions and edge cases
- **Total: 30+ test cases**

### `test_mosaic_export.py`
- Mosaic creation from 4 images
- Image loading from local paths and URLs
- Image resizing to 517x517 pixels
- Correct 2x2 grid positioning
- File system operations
- Mixed local/URL sources
- **Total: 25+ test cases**

### `test_integration.py`
- Scene3Backend class initialization
- Complete souvenir workflow
- Backend communication and uploads
- Screenshot handling
- Error handling and resilience
- Environment configuration
- **Total: 20+ test cases**

### `test_main_script.py`
- Workflow orchestration
- Step-by-step execution
- Error handling at each stage
- Environment variable handling
- Integration testing
- **Total: 20+ test cases**

## Running Tests

### Run All Tests
```bash
cd tests
python3 run_tests.py
```

### Run Specific Test File
```bash
python3 -m unittest tests/test_series_id_generator.py
python3 -m unittest tests/test_qr_generator.py
python3 -m unittest tests/test_mosaic_export.py
python3 -m unittest tests/test_integration.py
python3 -m unittest tests/test_main_script.py
```

### Run Specific Test Class
```bash
python3 -m unittest tests.test_series_id_generator.TestSeriesIdGenerator
```

### Run Specific Test Method
```bash
python3 -m unittest tests.test_series_id_generator.TestSeriesIdGenerator.test_generate_first_series_id
```

### Run with Verbose Output
```bash
python3 -m unittest discover -v tests/
```

## Test Structure

Each test file follows a consistent structure:
- **Setup/Teardown**: Manages test fixtures and cleanup
- **Happy Path Tests**: Tests normal operation
- **Edge Case Tests**: Tests boundary conditions
- **Error Handling Tests**: Tests failure scenarios
- **Integration Tests**: Tests component interactions

## Mocking Strategy

Tests use `unittest.mock` to:
- Mock external dependencies (PIL, qrcode, requests)
- Isolate units under test
- Simulate various scenarios (success, failure, edge cases)
- Avoid actual file I/O and network calls

## Dependencies

Tests require only Python standard library:
- `unittest` (built-in)
- `unittest.mock` (built-in)
- `tempfile` (built-in)
- `os`, `sys`, `shutil` (built-in)

No external dependencies needed for testing!

## Test Best Practices

1. **Descriptive Names**: Each test has a clear, descriptive name
2. **Single Responsibility**: Each test validates one specific behavior
3. **Isolation**: Tests don't depend on each other
4. **Cleanup**: Proper teardown ensures no test pollution
5. **Assertions**: Clear, specific assertions with helpful messages
6. **Coverage**: Happy paths, edge cases, and error conditions

## Expected Output

When all tests pass, you should see: