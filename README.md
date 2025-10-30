# Scene 3 – Mosaic Creation & QR System

### Author  
**Yasaswini (Scene 3: Mosaic Creation)**  

---

## 🎯 Overview
Scene 3 of the MozFest interactive installation generates a **digital mosaic** from the 4 themed cards each user selects in Scene 2.  
The script:
1. Combines the four images into a single **2×2 mosaic** (1034×1034 px).  
2. Exports the final image as **PNG**.  
3. Assigns a unique sequential **Series ID** in the format `H-2025xxxx`.  
4. Generates a **plain 300×300 QR code** linking to that Series ID.  
5. Saves all outputs locally and includes optional **AWS S3 upload** placeholders for cloud integration.

---
# 🧩 Workflow

**Scene 2 → 4 card images**  
↓  
`create_mosaic()` → mosaic.png  
↓  
`generate_series_id()` → H-20250001  
↓  
`create_qr()` → H-20250001.png  
↓  
*(optional)* `upload_to_s3()` → AWS bucket

---

# ⚙️ Setup & Usage

```bash
pip install pillow qrcode boto3
python main_script.py
```

*Note:*  
All AWS S3 credentials are placeholders (`YOUR_AWS_ACCESS_KEY`, etc.).  
Once backend provides details, update them in `mosaic_export.py` and `qr_generator.py` or use a `.env` file.

---

# 💻 Technologies Used

- **Python 3**
- **Pillow:** image processing
- **qrcode:** QR code generation
- **boto3:** AWS S3 integration (placeholders)
- **JSON / OS modules:** data tracking & file handling

---

# 📈 Future Integration

- Replace placeholder AWS keys with real credentials from backend.
- Upload both mosaic & QR files to S3 (`/mosaics/` and `/qr_codes/`).
- Connect Series ID lookup to website landing page.
- Fetch Scene 2 images dynamically from the card-selection output.

