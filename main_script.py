"""
TASK 4 – FULL WORKFLOW (Tasks 1–3)
Original Author: Yasaswini (Scene 3)
Updated by: Anissa Rmedi - Complete Scene 3 workflow with backend integration

Description:
Creates mosaic → generates Series ID → produces QR → sends to backend for storage.
"""

from mosaic_export import create_mosaic
from series_id_generator import generate_series_id
from qr_generator import create_qr
import os
import requests


def create_complete_souvenir(image_urls, name, country, screenshot_url=None, backend_url=None, base_url=None):
    """
    Complete Scene 3 workflow.
    
    Args:
        image_urls: List of 4 image URLs from Scene 2
        name: Contributor name
        country: Contributor country
        screenshot_url: Water tank screenshot URL (from Scene 1, optional)
        backend_url: Backend API URL (optional, from environment)
        base_url: Base URL for QR codes (optional, from environment)
    
    Returns:
        dict: Complete result with all paths, URLs, and IDs
    """
    print("\n" + "="*60)
    print("SCENE 3: CREATING DIGITAL SOUVENIR")
    print("="*60)
    
    # Get URLs from environment if not provided
    if not backend_url:
        backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")
    if not base_url:
        base_url = os.getenv("BASE_URL", "https://placeholder.site/series/")
    
    # Step 1: Generate Series ID
    print("\n[Step 1/5] Generating Series ID...")
    try:
        series_id = generate_series_id()
    except Exception as e:
        print(f"❌ Failed to generate Series ID: {e}")
        raise
    
    # Step 2: Create Mosaic
    print("\n[Step 2/5] Creating 2×2 mosaic...")
    try:
        mosaic_path = create_mosaic(
            image_paths=image_urls,
            series_id=series_id
        )
    except Exception as e:
        print(f"❌ Failed to create mosaic: {e}")
        raise
    
    # Step 3: Generate QR Code
    print("\n[Step 3/5] Generating QR code...")
    try:
        qr_result = create_qr(series_id, base_url=base_url)
    except Exception as e:
        print(f"❌ Failed to generate QR code: {e}")
        raise
    
    # Step 4: Upload to Backend
    print("\n[Step 4/5] Uploading to backend...")
    backend_response = None
    try:
        with open(mosaic_path, 'rb') as mosaic_file:
            # Prepare files
            files = {
                'mosaic': (f'{series_id}_mosaic.png', mosaic_file, 'image/png'),
            }
            
            # Prepare form data - INCLUDE SERIES_ID as Christine requested
            data = {
                'name': name,
                'country': country,
                'series_id': series_id,  # ✅ Christine confirmed this should be included
            }
            
            # If screenshot URL is provided (from Scene 1), download and include it
            if screenshot_url:
                try:
                    print(f"   Downloading screenshot from: {screenshot_url}")
                    screenshot_response = requests.get(screenshot_url, timeout=10)
                    if screenshot_response.status_code == 200:
                        files['screenshot'] = (
                            'screenshot.png',
                            screenshot_response.content,
                            'image/png'
                        )
                        print(f"   ✅ Screenshot included")
                    else:
                        print(f"   ⚠️ Could not download screenshot (status {screenshot_response.status_code})")
                except Exception as e:
                    print(f"   ⚠️ Error downloading screenshot: {e}")
            else:
                print(f"   ℹ️ No screenshot provided (Scene 1 should provide this)")
            
            # Send to Christine's backend
            print(f"   Sending to: {backend_url}/contributors/")
            response = requests.post(
                f"{backend_url}/contributors/",
                files=files,
                data=data,
                timeout=30
            )
            
            if response.status_code == 200:
                backend_response = response.json()
                print(f"✅ Successfully uploaded to backend!")
                print(f"   Backend Contributor ID: {backend_response.get('id')}")
                print(f"   Backend Mosaic URL: {backend_response.get('mosaic_url', 'N/A')}")
            else:
                print(f"⚠️ Backend upload failed: {response.status_code}")
                print(f"   Response: {response.text}")
                print(f"   Continuing with local files...")
                
    except Exception as e:
        print(f"⚠️ Backend unavailable: {e}")
        print(f"   Continuing with local files...")
    
    # Step 5: Prepare Result
    print("\n[Step 5/5] Preparing result...")
    result = {
        "series_id": series_id,
        "mosaic": {
            "local_path": mosaic_path,
            "backend_url": backend_response.get('mosaic_url') if backend_response else None
        },
        "qr_code": {
            "local_path": qr_result['local_path'],
            "lookup_url": qr_result['lookup_url']
        },
        "backend_saved": backend_response is not None,
        "backend_id": backend_response.get('id') if backend_response else None,
        "share_url": f"{backend_url}/contributors/{backend_response['id']}/share" if backend_response else None
    }
    
    # Print Summary
    print("\n" + "="*60)
    print("✅ WORKFLOW COMPLETE!")
    print("="*60)
    print(f"Series ID:        {series_id}")
    print(f"Mosaic (local):   {mosaic_path}")
    print(f"QR Code (local):  {qr_result['local_path']}")
    print(f"Lookup URL:       {qr_result['lookup_url']}")
    if backend_response:
        print(f"Backend ID:       {backend_response.get('id')}")
        print(f"Backend URL:      {backend_response.get('mosaic_url', 'N/A')}")
        print(f"Share Page:       {result['share_url']}")
        print(f"Status:           ✅ Saved to backend")
    else:
        print(f"Status:           ⚠️ Local only (backend unavailable)")
    print("="*60 + "\n")
    
    return result


def main():
    """Test function with sample data."""
    # Sample data (Scene 2 will provide this)
    test_data = {
        'image_urls': [
            "https://example.com/card1.jpg",
            "https://example.com/card2.jpg",
            "https://example.com/card3.jpg",
            "https://example.com/card4.jpg"
        ],
        'name': "Test User",
        'country': "Tunisia",
        'screenshot_url': "https://example.com/water-tank-screenshot.jpg"  # From Scene 1
    }
    
    result = create_complete_souvenir(
        image_urls=test_data['image_urls'],
        name=test_data['name'],
        country=test_data['country'],
        screenshot_url=test_data['screenshot_url']  # Optional - from Scene 1
    )
    
    return result


if __name__ == "__main__":
    main()