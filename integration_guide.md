# Scene 3 Integration Guide

## Overview
Scene 3 creates mosaics from Scene 2 card selections, assigns unique Series IDs, generates QR codes, and integrates with the backend for storage.

## Complete Data Flow
```
Scene 2
    ↓
    4 selected cards (response objects with images)
    ↓
Scene 3 (YOUR TASKS)
    ↓
    Task 1: create_mosaic() → 2×2 PNG (1034×1034)
    Task 2: generate_series_id() → H-2025XXXX
    Task 3: create_qr() → 300×300 QR PNG
    ↓
    (Optional) Upload to Backend
    ↓
Backend
    ↓
    Store in Cloudinary
    Save to database
    Return share page URL
```

## Scene 3 Tasks 

### ✅ Task 1: Export Mosaic as PNG
- **File:** `mosaic_export.py`
- **Function:** `create_mosaic()`
- **Output:** 2×2 mosaic (1034×1034 px) saved locally
- **Format:** PNG, optimized

### ✅ Task 2: Assign Series ID
- **File:** `series_id_generator.py`
- **Function:** `generate_series_id()`
- **Output:** Unique ID in format `H-2025XXXX`
- **Storage:** Local JSON counter (increments sequentially)

### ✅ Task 3: Generate QR Code
- **File:** `qr_generator.py`
- **Function:** `create_qr()`
- **Output:** 300×300 QR code PNG
- **Links to:** `BASE_URL/series/{series_id}`
- **Purpose:** Users can scan to view their mosaic later

## Scene 2 → Scene 3 Integration

### What Scene 2 Needs to Pass:
```javascript
// When "View Collection" button is clicked
function viewCollection(collected) {
    // collected is array of 4 response objects
    
    // Extract image URLs (adjust field name as needed)
    const imageUrls = collected.map(card => card.imageUrl || card.answer);
    
    // Get user info (from form or session)
    const userData = {
        name: getUserName(),    // TODO: Implement
        country: getUserCountry() // TODO: Implement
    };
    
    // Call Scene 3
    fetch('/api/scene3/create-souvenir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageUrls: imageUrls,
            name: userData.name,
            country: userData.country
        })
    })
    .then(response => response.json())
    .then(result => {
        // Show success message with Series ID
        alert(`Your souvenir is ready! Series ID: ${result.series_id}`);
        
        // Navigate to result page or download
        window.location.href = result.share_url || '/success';
    });
}
```

## Scene 3 → Backend Integration

### What Scene 3 Sends to Backend:
```python
# From main_script.py

files = {
    'mosaic': (f'{series_id}_mosaic.png', mosaic_file, 'image/png')
}

data = {
    'name': 'User Name',
    'country': 'Country',
    'series_id': 'H-20250001'  # Include the Series ID we generated
}

# POST to /contributors/
response = requests.post(f"{backend_url}/contributors/", files=files, data=data)
```

### What Backend Returns:
```json
{
    "id": 1,
    "name": "User Name",
    "country": "Country",
    "series_id": "H-20250001",
    "mosaic_url": "https://res.cloudinary.com/.../H-20250001_mosaic.png",
    "screenshot_url": null,
    "created_at": "2025-10-31T12:00:00Z"
}
```

## File Outputs

### Local Files Created:
```
output/
├── H-20250001_mosaic.png        # 2×2 mosaic (1034×1034)
├── qr_codes/
│   └── H-20250001_qr.png        # QR code (300×300)
└── id_counter.json               # Series ID counter
```

### Backend Storage:
- Mosaic uploaded to Cloudinary
- Metadata saved to database
- Share page generated at `/contributors/{id}/share`

## Configuration

### Required Environment Variables:
```env
# Backend API endpoint
BACKEND_URL=http://localhost:8000

# Where QR codes should link to
BASE_URL=https://yourwebsite.com/series/

# Frontend for navigation
FRONTEND_URL=http://localhost:3000
```

### Where to Get These:

| Variable | Source | Status |
|----------|--------|--------|
| BACKEND_URL | Backend team | ⏳ Waiting |
| BASE_URL | Team/website | ⏳ Waiting |
| FRONTEND_URL | Website team | ⏳ Waiting |

## Testing Scene 3 Standalone
```bash
# Install dependencies
pip install -r requirements.txt

# Run test
python main_script.py

# Check output folder
ls -la output/
ls -la output/qr_codes/
``
