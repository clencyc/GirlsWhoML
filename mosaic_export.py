"""
TASK 1 – MOSAIC EXPORT
Original Author: Yasaswini (Scene 3)
Updated by: Anissa Rmedi - Simplified for backend integration

Description:
Combines four selected tiles into a 2×2 mosaic (1034×1034 px) and saves PNG locally.
Upload to Cloudinary is handled by Christine's backend.
"""

from PIL import Image
import os


def create_mosaic(image_paths, output_path="output/mosaic.png", series_id=None):
    """
    Creates a 2×2 mosaic from 4 images.
    
    Args:
        image_paths: List of 4 image file paths or URLs
        output_path: Where to save the mosaic locally
        series_id: Optional Series ID for filename (e.g., "H-20250001")
    
    Returns:
        str: Path to the saved mosaic file
    """
    # Validate input
    if len(image_paths) != 4:
        raise ValueError("Exactly 4 images required for mosaic")
    
    # Load and resize images to 517×517 (to make 1034×1034 total)
    imgs = []
    for img_path in image_paths:
        try:
            # Handle both local paths and URLs
            if img_path.startswith(('http://', 'https://')):
                from io import BytesIO
                import requests
                response = requests.get(img_path)
                img = Image.open(BytesIO(response.content))
            else:
                img = Image.open(img_path)
            
            img = img.resize((517, 517), Image.Resampling.LANCZOS)
            imgs.append(img)
        except Exception as e:
            print(f"⚠️ Error loading image {img_path}: {e}")
            raise
    
    # Create 2×2 mosaic
    mosaic = Image.new("RGB", (1034, 1034))
    mosaic.paste(imgs[0], (0, 0))      # Top-left
    mosaic.paste(imgs[1], (517, 0))    # Top-right
    mosaic.paste(imgs[2], (0, 517))    # Bottom-left
    mosaic.paste(imgs[3], (517, 517))  # Bottom-right
    
    # Update output path to include Series ID if provided
    if series_id:
        output_dir = os.path.dirname(output_path) or "output"
        output_path = os.path.join(output_dir, f"{series_id}_mosaic.png")
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path) or "output", exist_ok=True)
    
    # Save locally
    mosaic.save(output_path, optimize=True)
    print(f"✅ Mosaic created → {output_path}")
    
    return output_path


if __name__ == "__main__":
    # Test with sample images
    sample = ["input/img1.png", "input/img2.png", "input/img3.png", "input/img4.png"]
    result = create_mosaic(sample, series_id="H-20250001")
    print(f"\nMosaic saved at: {result}")