# Scene 3 – Mosaic Creation & QR System

### Authors  
**Original:** Yasaswini (Scene 3)  
**Updated:** Anissa Rmedi (Backend integration)

---

## 🎯 Overview

Scene 3 creates digital souvenirs from user card selections:
1. **Export mosaic as PNG** (2×2 grid, 1034×1034 px)
2. **Assign Series ID** (H-2025XXXX format)
3. **Generate QR code** (300×300 px, links to lookup page)
4. **Upload to backend** (Cloudinary storage + database)

---

## 🧩 Data Flow
```
Scene 2 → 4 cards + user info  
    ↓  
Scene 3 → Mosaic + Series ID + QR code  
    ↓  
Backend → Cloudinary upload + database save  
    ↓  
User → Share page with mosaic & QR
```

---

## ⚙️ Quick Start

### Install
```bash
pip install -r requirements.txt
```

### Configure
```bash
cp .env.example .env
# Edit .env with your URLs
```

### Test
```bash
python main_script.py
```

---

## 📁 File Structure
```
scene3/
├── mosaic_export.py           # Task 1: Mosaic creation
├── series_id_generator.py     # Task 2: Series ID
├── qr_generator.py            # Task 3: QR code
├── main_script.py             # Complete workflow
├── requirements.txt           # Dependencies
├── .env.example               # Config template
├── README.md                  # This file
└── integration_guide.md       # Integration docs

output/
├── H-20250001_mosaic.png      # Mosaics
├── qr_codes/                   # QR codes
└── id_counter.json             # Counter
```

---

## 💻 Usage

### Individual Tasks
```python
# Task 1: Create mosaic
from mosaic_export import create_mosaic
mosaic_path = create_mosaic(["img1.png", "img2.png", "img3.png", "img4.png"])

# Task 2: Generate Series ID
from series_id_generator import generate_series_id
series_id = generate_series_id()  # "H-20250001"

# Task 3: Create QR code
from qr_generator import create_qr
qr_result = create_qr("H-20250001")
```

### Complete Workflow
```python
from main_script import create_complete_souvenir

result = create_complete_souvenir(
    image_urls=["url1", "url2", "url3", "url4"],
    name="User Name",
    country="Tunisia",
    screenshot_url="https://.../screenshot.png"  # From Scene 1
)
```

**Returns:**
```python
{
    "series_id": "H-20250001",
    "mosaic": {"local_path": "...", "backend_url": "..."},
    "qr_code": {"local_path": "...", "lookup_url": "..."},
    "backend_saved": True,
    "share_url": "http://backend/contributors/1/share"
}
```

---

## 🔗 Integration Requirements

### Inputs (from other scenes):

| Input | Source | Required | Description |
|-------|--------|----------|-------------|
| `image_urls` | Scene 2 | ✅ | 4 card image URLs |
| `name` | User form | ✅ | Contributor name |
| `country` | User form | ✅ | Contributor country |
| `screenshot_url` | Scene 1 | ✅* | Water tank screenshot |

*Scene 2 must pass this from Scene 1 (required by backend)

### Outputs:

| Output | Format | Destination |
|--------|--------|-------------|
| `series_id` | H-2025XXXX | Backend + QR |
| `mosaic` | PNG (1034×1034) | Backend + local |
| `qr_code` | PNG (300×300) | Local |

---

## ⚙️ Configuration

### Environment Variables:
```env
BACKEND_URL=http://localhost:8000        # Backend API (waiting)
BASE_URL=https://yoursite.com/series/    # QR lookup (waiting)
FRONTEND_URL=http://localhost:3000       # Frontend (waiting)
```

### Backend POST Format:
```
POST /contributors/

Form Data:
- name, country, series_id ✅

Files:
- mosaic (Scene 3) ✅
- screenshot (Scene 1) ✅
```

---

## 📋 Tasks Checklist

- [x] Task 1: Export mosaic as PNG
- [x] Task 2: Assign Series ID
- [x] Task 3: Generate QR code
- [x] Backend integration
- [ ] Scene 2 integration (coordination needed)
- [ ] Production deployment (waiting on URLs)

---

## 🔧 Technologies

- **Python 3.8+**
- **Pillow** - Image processing
- **qrcode** - QR generation
- **requests** - HTTP client

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Verify URLs accessible |
| Series ID not incrementing | Check `output/` permissions |
| QR not working | Verify BASE_URL correct |
| Backend fails | Local files still saved |

---

## 📞 Coordination Needed

**Scene 2:** Card URLs, user data, screenshot URL  
**Backend:** BACKEND_URL, confirm POST format  
**Website:** BASE_URL, create lookup page  

See `integration_guide.md` for detailed integration steps.

---

