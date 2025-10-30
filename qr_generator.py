"""
TASK 3 – QR CODE GENERATOR + AWS S3 UPLOAD (PLACEHOLDER)
Generates 300×300 plain QR for Series ID and uploads to S3 (if configured).
"""

import qrcode, os, boto3

# AWS Placeholders
AWS_ACCESS_KEY = "YOUR_AWS_ACCESS_KEY"
AWS_SECRET_KEY = "YOUR_AWS_SECRET_KEY"
AWS_BUCKET_NAME = "YOUR_BUCKET_NAME"
AWS_REGION = "YOUR_REGION"

def upload_to_s3(file_path, s3_folder="qr_codes/"):
    try:
        s3 = boto3.client("s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION)
        name = os.path.basename(file_path)
        key = f"{s3_folder}{name}"
        s3.upload_file(file_path, AWS_BUCKET_NAME, key)
        url = f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{key}"
        print(f"✅ QR uploaded → {url}")
        return url
    except Exception as e:
        print(f"⚠️ Upload skipped (placeholder): {e}")
        return None

def create_qr(series_id, output_dir="output/qr_codes/"):
    os.makedirs(output_dir, exist_ok=True)
    url = f"https://placeholder.site/{series_id}"
    qr = qrcode.QRCode(box_size=10, border=4)
    qr.add_data(url); qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    path = os.path.join(output_dir, f"{series_id}.png")
    img.save(path)
    print(f"✅ QR created → {path}")
    upload_to_s3(path)
    return path

if __name__ == "__main__":
    create_qr("H-20250001")

