# Scene 3 – Mosaic Creation & QR System

### Authors  
**Original:** Yasaswini (Scene 3)  
**Updated:** Anissa Rmedi (Backend integration)

---

## 🎯 Overview
Scene 3 of the MozFest interactive installation generates a **digital mosaic** from the 4 themed cards each user selects in Scene 2.

### The Complete Workflow:
1. **Export mosaic as PNG** - Combines 4 images into 2×2 grid (1034×1034 px)
2. **Assign Series ID** - Generates unique ID in format `H-2025XXXX`
3. **Generate QR code** - Creates 300×300 QR linking to Series ID lookup page
4. **Upload to backend** - Stores mosaic and metadata (optional)

---

## 🧩 Data Flow
```
Scene 2 → 4 card selections  
    ↓  
Scene 3 (Task 1) → create_mosaic() → PNG saved  
    ↓  
Scene 3 (Task 2) → generate_series_id() → H-2025XXXX  
    ↓  
Scene 3 (Task 3) → create_qr() → QR PNG saved  
    ↓  
Backend (optional) → uploads to Cloudinary  
                   → saves to database  
                   → returns share URL
```

---

## ⚙️ Setup & Usage

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
BACKEND_URL=http://localhost:8000
BASE_URL=https://yourwebsite.com/series/
FRONTEND_URL=http://localhost:3000
```

### 3. Test the Workflow
```bash
python main_script.py
```

Expected output:
```
SCENE 3: CREATING DIGITAL SOUVENIR
[Step 1/5] Generating Series ID...
✅ Generated Series ID → H-20250001
[Step 2/5] Creating 2×2 mosaic...
✅ Mosaic created → output/H-20250001_mosaic.png
[Step 3/5] Generating QR code...
✅ QR code created → output/qr_codes/H-20250001_qr.png
[Step 4/5] Uploading to backend...
✅ Successfully uploaded to backend!
[Step 5/5] Preparing result...
✅ WORKFLOW COMPLETE!
```

---

## 📁 File Structure
```
scene3/
├── mosaic_export.py           # Task 1: Mosaic creation
├── series_id_generator.py     # Task 2: Series ID generation
├── qr_generator.py            # Task 3: QR code generation
├── main_script.py             # Complete workflow orchestration
├── requirements.txt           # Python dependencies
├── .env.example               # Environment template
├── README.md                  # This file
└── integration_guide.md       # Integration documentation

output/                        # Generated files
├── H-20250001_mosaic.png     # Mosaics
├── qr_codes/                  # QR codes
│   └── H-20250001_qr.png
└── id_counter.json            # Series ID counter
```

---

## 💻 Usage Examples

### Task 1: Create Mosaic Only
```python
from mosaic_export import create_mosaic

mosaic_path = create_mosaic(
    image_paths=["img1.png", "img2.png", "img3.png", "img4.png"],
    series_id="H-20250001"
)
# Output: "output/H-20250001_mosaic.png"
```

### Task 2: Generate Series ID Only
```python
from series_id_generator import generate_series_id

series_id = generate_series_id()
# Output: "H-20250001"
```

### Task 3: Create QR Code Only
```python
from qr_generator import create_qr

qr_result = create_qr("H-20250001")
# Output: {
#     "local_path": "output/qr_codes/H-20250001_qr.png",
#     "lookup_url": "https://yoursite.com/series/H-20250001"
# }
```

### Complete Workflow
```python
from main_script import create_complete_souvenir

result = create_complete_souvenir(
    image_urls=["url1", "url2", "url3", "url4"],
    name="User Name",
    country="Tunisia"
)

# Returns:
# {
#     "series_id": "H-20250001",
#     "mosaic": {
#         "local_path": "output/H-20250001_mosaic.png",
#         "backend_url": "https://res.cloudinary.com/..."
#     },
#     "qr_code": {
#         "local_path": "output/qr_codes/H-20250001_qr.png",
#         "lookup_url": "https://yoursite.com/series/H-20250001"
#     },
#     "backend_saved": true,
#     "share_url": "http://backend/contributors/1/share"
# }
```

---

## 🔗 Integration Points

### From Scene 2:
- **Input:** 4 card image URLs
- **Input:** User name and country
- **Trigger:** "View Collection" button click

### To Backend:
- **Sends:** Mosaic PNG file
- **Sends:** Series ID, name, country
- **Receives:** Cloudinary URL, share page URL

### To Users:
- **Delivers:** Mosaic image (1034×1034)
- **Delivers:** QR code (300×300)
- **Delivers:** Series ID for lookup

---

## 📋 Scene 3 Tasks Checklist

- [x] **Task 1:** Export mosaic as PNG ✅
- [x] **Task 2:** Assign unique Series ID ✅
- [x] **Task 3:** Generate QR code ✅
- [x] Backend integration ✅
- [ ] Scene 2 integration (coordination needed)
- [ ] Production deployment (waiting on URLs)

---

## ⚠️ Configuration Needed

### From Backend Team:
- [ ] **BACKEND_URL** - FastAPI server endpoint
- [ ] Confirm backend data format expectations
- [ ] Production Cloudinary credentials (if direct upload needed)

### From Website Team:
- [ ] **BASE_URL** - Production domain for QR lookup
- [ ] Create `/series/{series_id}` lookup page
- [ ] Design success/result page

### From Scene 2 Team:
- [ ] Confirm card image URL field name
- [ ] Confirm user name/country data source
- [ ] Define navigation flow
- [ ] Test data handoff

---

## 💻 Technologies Used

- **Python 3.8+**
- **Pillow** - Image processing (mosaic creation)
- **qrcode** - QR code generation
- **requests** - HTTP client (backend integration)
- **JSON** - Data storage (Series ID counter)

