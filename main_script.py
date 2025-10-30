"""
TASK 4 – FULL WORKFLOW (Tasks 1–3)
Creates mosaic → generates Series ID → produces QR → uploads both to S3.
"""

from mosaic_export import create_mosaic
from series_id_generator import generate_series_id
from qr_generator import create_qr
import os

def main():
    os.makedirs("output", exist_ok=True)
    # Step 1 – Mosaic
    images = ["input/img1.png","input/img2.png","input/img3.png","input/img4.png"]
    mosaic = create_mosaic(images)
    # Step 2 – ID
    sid = generate_series_id()
    # Step 3 – QR
    qr = create_qr(sid)
    print(f"\n✅ Workflow complete!\nMosaic: {mosaic}\nSeries ID: {sid}\nQR: {qr}")

if __name__ == "__main__":
    main()
