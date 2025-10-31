# Scene 3 Integration Guide

## Overview
Scene 3 creates mosaics from Scene 2 card selections, assigns unique Series IDs, generates QR codes, and integrates with the backend for storage.

## Complete Data Flow
```
Scene 2 → 4 cards + user info + screenshot URL (from Scene 1)
    ↓
Scene 3:
    - Task 1: create_mosaic() → 2×2 PNG (1034×1034)
    - Task 2: generate_series_id() → H-2025XXXX
    - Task 3: create_qr() → 300×300 QR PNG
    ↓
Backend → Upload to Cloudinary → Save to database → Return share URL
```

---

## Scene 3 Tasks (Your Responsibility)

### ✅ Task 1: Export Mosaic as PNG
- **File:** `mosaic_export.py`
- **Output:** 2×2 mosaic (1034×1034 px)

### ✅ Task 2: Assign Series ID
- **File:** `series_id_generator.py`
- **Output:** Unique ID in format `H-2025XXXX`

### ✅ Task 3: Generate QR Code
- **File:** `qr_generator.py`
- **Output:** 300×300 QR code linking to `BASE_URL/series/{series_id}`

---

## Data Requirements

### Inputs (from other scenes):

| Input | Source | Required | Description |
|-------|--------|----------|-------------|
| `image_urls` | Scene 2 | ✅ Yes | 4 card image URLs |
| `name` | User form | ✅ Yes | Contributor name |
| `country` | User form | ✅ Yes | Contributor country |
| `screenshot_url` | Scene 1 | ✅ Yes* | Water tank screenshot |

*Required by backend. Scene 2 must pass this from Scene 1.

### Outputs (Scene 3 generates):

| Output | Format | Purpose |
|--------|--------|---------|
| `series_id` | H-2025XXXX | Unique identifier |
| `mosaic` | PNG (1034×1034) | 2×2 grid of cards |
| `qr_code` | PNG (300×300) | Series lookup |

---

## Scene 2 → Scene 3 Integration

### Expected Data Format:
```javascript
// Scene 2 should pass to Scene 3:
{
    imageUrls: ["url1", "url2", "url3", "url4"],  // From Scene 2
    name: "User Name",                              // From user form
    country: "Tunisia",                             // From user form
    screenshot_url: "https://.../screenshot.png"    // From Scene 1
}
```

### Example Integration:
```javascript
function viewCollection(collected) {
    const imageUrls = collected.map(card => card.imageUrl || card.answer);
    
    fetch('/api/scene3/create-souvenir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageUrls: imageUrls,
            name: getUserName(),
            country: getUserCountry(),
            screenshot_url: getScreenshotUrl() // From Scene 1
        })
    })
    .then(response => response.json())
    .then(result => {
        alert(`Your souvenir is ready! Series ID: ${result.series_id}`);
        window.location.href = result.share_url;
    });
}
```

---

## Scene 3 → Backend Integration

### POST Request Format:
```
POST /contributors/

Form Data:
- name: "User Name"
- country: "Tunisia"
- series_id: "H-20250001"  ✅ (confirmed required)

Files:
- mosaic: H-20250001_mosaic.png (Scene 3 creates)
- screenshot: screenshot.png (from Scene 1)
```

### Backend Response:
```json
{
    "id": 1,
    "name": "User Name",
    "country": "Country",
    "series_id": "H-20250001",
    "mosaic_url": "https://res.cloudinary.com/.../mosaic.png",
    "screenshot_url": "https://res.cloudinary.com/.../screenshot.png",
    "created_at": "2025-10-31T12:00:00Z"
}
```

---

## File Outputs

### Local Files:
```
output/
├── H-20250001_mosaic.png     # 2×2 mosaic
├── qr_codes/
│   └── H-20250001_qr.png     # QR code
└── id_counter.json            # Series counter
```

### Backend Storage:
- Mosaic uploaded to Cloudinary
- Metadata saved to database
- Share page at `/contributors/{id}/share`

---

## Configuration

### Environment Variables:
```env
BACKEND_URL=http://localhost:8000        # Backend API
BASE_URL=https://yourwebsite.com/series/ # QR lookup page
FRONTEND_URL=http://localhost:3000       # Frontend URL
```

### Configuration Status:

| Variable | Status |
|----------|--------|
| BACKEND_URL | ⏳ Waiting from backend team |
| BASE_URL | ⏳ Waiting from website team |
| FRONTEND_URL | ⏳ Waiting from website team |

---

## Testing
```bash
# Install dependencies
pip install -r requirements.txt

# Run test
python main_script.py

# Check outputs
ls -la output/
ls -la output/qr_codes/
```

---

## Coordination Checklist

**Scene 2 Team:**
- [ ] Confirm card image URL field name
- [ ] Confirm user name/country source
- [ ] Provide water tank screenshot URL (from Scene 1)
- [ ] Define navigation flow

**Backend Team:**
- [ ] Provide production BACKEND_URL
- [ ] Confirm all POST data format is correct

**Website Team:**
- [ ] Provide production BASE_URL
- [ ] Create `/series/{series_id}` lookup page
- [ ] Provide FRONTEND_URL

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Verify URLs are accessible |
| Series ID not incrementing | Check write permissions on `output/` |
| QR code not working | Verify BASE_URL is correct |
| Backend upload fails | Scene 3 saves locally as backup |

---

