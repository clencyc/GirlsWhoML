"""
Scene 3 Backend Integration - Production Ready
Follows integration_guide.md specifications
Uses Cloudinary, PostgreSQL, and existing backend infrastructure
"""

import os
import requests
import logging
from mosaic_export import create_mosaic
from series_id_generator import generate_series_id
from qr_generator import create_qr

#configure logging for production
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class Scene3Backend:
    """
    Production-ready Scene 3 Backend Integration.
    Handles mosaic creation, Series ID generation, QR code creation,
    and backend upload to Cloudinary + PostgreSQL.
    
    Follows integration_guide.md specifications exactly.
    """
    
    def __init__(self, backend_url=None, base_url=None):
        """
        Initialize Scene 3 Backend integration.
        
        Args:
            backend_url: Backend API URL (from env or deployment config)
            base_url: Base URL for QR codes (from env or deployment config)
        """
        self.backend_url = backend_url or os.getenv(
            "BACKEND_URL", 
            "http://localhost:8000"
        )
        self.base_url = base_url or os.getenv(
            "BASE_URL", 
            "https://placeholder.site/series/"
        )
        logger.info(f"Scene3Backend initialized - Backend: {self.backend_url}")
    
    def create_complete_souvenir(self, image_urls, name, country, screenshot_url=None):
        """
        Complete Scene 3 workflow following integration_guide.md.
        
        Workflow (per integration_guide.md):
        1. Generate Series ID (H-2025XXXX format)
        2. Create 2×2 mosaic (1034×1034 px) from 4 images
        3. Generate QR code (300×300 px)
        4. Upload to backend via POST /contributors/
        5. Backend uploads to Cloudinary and saves to PostgreSQL
        
        Args:
            image_urls: List of 4 image URLs from Scene 2
            name: Contributor name
            country: Contributor country
            screenshot_url: Water tank screenshot URL from Scene 1 (optional)
        
        Returns:
            dict: {
                'series_id': str,
                'mosaic': dict,
                'qr_code': dict,
                'backend_saved': bool,
                'backend_id': int or None,
                'share_url': str or None,
                'mosaic_url': str or None (Cloudinary URL)
            }
        """
        logger.info(f"🚀 Starting Scene 3 workflow for {name} from {country}")
        
        # Validate inputs per integration_guide.md
        if not image_urls or len(image_urls) != 4:
            raise ValueError(f"Expected 4 images, got {len(image_urls) if image_urls else 0}")
        
        try:
            # Step 1: Generate Series ID (H-2025XXXX format)
            logger.info("[1/5] Generating Series ID...")
            series_id = generate_series_id()
            logger.info(f"✓ Generated Series ID: {series_id}")
            
            # Step 2: Create Mosaic (2×2 PNG, 1034×1034 px)
            logger.info("[2/5] Creating 2×2 mosaic (1034×1034 px)...")
            mosaic_path = create_mosaic(
                image_paths=image_urls,
                series_id=series_id
            )
            logger.info(f" Mosaic created: {mosaic_path}")
            
            # Step 3: Generate QR Code (300×300 px)
            logger.info("[3/5] Generating QR code (300×300 px)...")
            qr_result = create_qr(series_id, base_url=self.base_url)
            logger.info(f"QR code created: {qr_result['local_path']}")
            
            # Step 4: Upload to Backend (POST /contributors/)
            logger.info("[4/5] Uploading to backend...")
            backend_response = self._upload_to_backend(
                mosaic_path=mosaic_path,
                name=name,
                country=country,
                series_id=series_id,
                screenshot_url=screenshot_url
            )
            
            # Step 5: Prepare Result
            logger.info("[5/5] Preparing result...")
            result = {
                "series_id": series_id,
                "mosaic": {
                    "local_path": mosaic_path,
                    "cloudinary_url": backend_response.get('mosaic_url') if backend_response else None
                },
                "qr_code": {
                    "local_path": qr_result['local_path'],
                    "lookup_url": qr_result['lookup_url']
                },
                "backend_saved": backend_response is not None,
                "backend_id": backend_response.get('id') if backend_response else None,
                "contributor": backend_response if backend_response else None,
                "share_url": f"{self.backend_url}/contributors/{backend_response['id']}/share" if backend_response else None
            }
            
            logger.info(f" Workflow complete! Series ID: {series_id}")
            if backend_response:
                logger.info(f"Cloudinary URL: {backend_response.get('mosaic_url')}")
                logger.info(f"Share URL: {result['share_url']}")
            
            return result
            
        except Exception as e:
            logger.error(f"Scene 3 workflow failed: {e}", exc_info=True)
            raise
    
    def _upload_to_backend(self, mosaic_path, name, country, series_id, screenshot_url=None):
        """
        Upload to backend following integration_guide.md format.
        Backend handles Cloudinary upload and PostgreSQL storage.
        
        POST /contributors/
        Form Data: name, country, series_id
        Files: mosaic, screenshot
        
        Args:
            mosaic_path: Path to mosaic file
            name: Contributor name
            country: Contributor country
            series_id: Generated Series ID (H-2025XXXX)
            screenshot_url: Optional screenshot URL from Scene 1
        
        Returns:
            dict: Backend response with Cloudinary URLs or None if failed
        """
        try:
            with open(mosaic_path, 'rb') as mosaic_file:
                # Prepare files per integration_guide.md
                files = {
                    'mosaic': (f'{series_id}_mosaic.png', mosaic_file, 'image/png'),
                }
                
                # Prepare form data (integration_guide.md: series_id is required)
                data = {
                    'name': name,
                    'country': country,
                    'series_id': series_id,  # Required per integration_guide.md
                }
                
                # Download and include screenshot if URL provided from Scene 1
                if screenshot_url:
                    try:
                        logger.info(f"Downloading screenshot from Scene 1: {screenshot_url}")
                        screenshot_response = requests.get(screenshot_url, timeout=15)
                        
                        if screenshot_response.status_code == 200:
                            files['screenshot'] = (
                                f'{series_id}_screenshot.png',
                                screenshot_response.content,
                                'image/png'
                            )
                            logger.info("Screenshot included")
                        else:
                            logger.warning(f"Could not download screenshot (HTTP {screenshot_response.status_code})")
                    except Exception as e:
                        logger.warning(f"Error downloading screenshot: {e}")
                else:
                    logger.warning("No screenshot URL provided from Scene 1")
                
                # Send to backend - backend handles Cloudinary upload
                endpoint = f"{self.backend_url}/contributors/"
                logger.info(f"Sending POST to: {endpoint}")
                
                response = requests.post(
                    endpoint,
                    files=files,
                    data=data,
                    timeout=60  # Increased timeout for Cloudinary upload
                )
                
                if response.status_code == 200:
                    backend_data = response.json()
                    logger.info(f" Backend upload successful!")
                    logger.info(f"   Contributor ID: {backend_data.get('id')}")
                    logger.info(f"   Mosaic URL (Cloudinary): {backend_data.get('mosaic_url', 'N/A')}")
                    logger.info(f"   Screenshot URL (Cloudinary): {backend_data.get('screenshot_url', 'N/A')}")
                    return backend_data
                else:
                    logger.error(f" Backend upload failed: HTTP {response.status_code}")
                    logger.error(f"   Response: {response.text}")
                    return None
                    
        except requests.exceptions.ConnectionError as e:
            logger.error(f" Cannot connect to backend at {self.backend_url}: {e}")
            logger.info("Files saved locally as backup")
            return None
        except Exception as e:
            logger.error(f" Upload error: {e}", exc_info=True)
            return None


def create_souvenir(image_urls, name, country, screenshot_url=None, backend_url=None, base_url=None):
    """
    Main function for Scene 3 workflow - Call this from your application.
    
    Args:
        image_urls: List of 4 image URLs from Scene 2
        name: Contributor name
        country: Contributor country
        screenshot_url: Water tank screenshot URL from Scene 1 (recommended)
        backend_url: Backend API URL (optional, uses env or default)
        base_url: Base URL for QR codes (optional, uses env or default)
    
    Returns:
        dict: Complete result with all paths, URLs, and IDs
    
    Example:
        >>> # Called by Scene 2 with actual user selections
        >>> result = create_souvenir(
        ...     image_urls=selected_card_urls,  # From Scene 2
        ...     name=user_name,
        ...     country=user_country,
        ...     screenshot_url=scene1_screenshot_url
        ... )
        >>> print(f"Series ID: {result['series_id']}")
        >>> print(f"Share URL: {result['share_url']}")
    """
    backend = Scene3Backend(backend_url=backend_url, base_url=base_url)
    return backend.create_complete_souvenir(
        image_urls=image_urls,
        name=name,
        country=country,
        screenshot_url=screenshot_url
    )
