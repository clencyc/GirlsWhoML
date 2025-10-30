"""
TASK 1 – MOSAIC EXPORT + AWS S3 UPLOAD (PLACEHOLDER)
Author: Yasaswini (Scene 3)
Description:
Combines four selected tiles into a 2×2 mosaic (1034×1034 px), saves PNG locally,
and uploads to AWS S3 when credentials are provided.
"""

from PIL import Image
import boto3, os

# --- AWS PLACEHOLDERS ---
AWS_ACCESS_KEY = "YOUR_AWS_ACCESS_KEY"
AWS_SECRET_KEY = "YOUR_AWS_SECRET_KEY"
AWS_BUCKET_NAME = "YOUR_BUCKET_NAME"
AWS_REGION = "YOUR_REGION"  # e.g. "ap-south-1"

def upload_to_s3(file_path, s3_folder="mosaics/"):
    """Upload file to AWS S3 using boto3 (placeholders active)."""
    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION
        )
        file_name = os.path.basename(file_path)
        s3_key = f"{s3_folder}{file_name}"
        s3.upload_file(file_path, AWS_BUCKET_NAME, s3_key)
        url = f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{s3_key}"
        print(f"✅ Uploaded to S3 → {url}")
        return url
    except Exception as e:
        print(f"⚠️ S3 upload skipped (placeholder): {e}")
        return None

def create_mosaic(image_paths, output_path="output/mosaic.png"):
    imgs = [Image.open(i).resize((517, 517)) for i in image_paths]
    mosaic = Image.new("RGB", (1034, 1034))
    mosaic.paste(imgs[0], (0, 0))
    mosaic.paste(imgs[1], (517, 0))
    mosaic.paste(imgs[2], (0, 517))
    mosaic.paste(imgs[3], (517, 517))
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    mosaic.save(output_path)
    print(f"✅ Mosaic created → {output_path}")
    upload_to_s3(output_path)
    return output_path

if __name__ == "__main__":
    sample = ["input/img1.png","input/img2.png","input/img3.png","input/img4.png"]
    create_mosaic(sample)
