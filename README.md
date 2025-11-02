# Digital Souvenir Platform - README
Overview
The Digital Souvenir Platform is a web application that allows users to create personalized digital souvenirs, reflect on their experience, and share their creations on social media. It's designed for interactive installations, exhibitions, or conservation awareness campaigns.

Features
🎨 Visual Components
2×2 Digital Souvenir Mosaic: Four-panel visual representation of user's journey

Interactive Water Tank: Visual water level indicator with customizable design

Responsive Design: Works seamlessly on desktop and mobile devices

📝 User Interaction
User Information Collection: Name and country (mandatory fields)

Reflective Questions:

"What word best describes how you feel after exploring our installation?"

"What is one insight/learning/reflection that you'll take away with you?"

Auto-save Functionality: Responses are saved automatically as users type

🔗 Social & Sharing
Social Media Integration: Share buttons for Instagram, Twitter, Facebook, and LinkedIn

QR Code Generation: Directs users to contributor gallery

Download Capability: Export souvenir and reflections

💾 Data Management
Series ID Generation: Unique identifier for each user session

Local Storage: Saves user data in database

Structured Data Storage: Organizes user info, responses, and media links

File Structure
text
digital-souvenir-platform/
│
├── index.html                 # Main application file
├── README.md                  # This documentation
└── assets/                    # Optional asset directory
    ├── images/
    │   ├── mosaic-1.jpg
    │   ├── mosaic-2.jpg
    │   ├── mosaic-3.jpg
    │   ├── mosaic-4.jpg
    │   └── water-tank.jpg
    └── styles/
        └── custom.css         # Additional styling
Installation & Setup
Prerequisites
Modern web browser (Chrome, Firefox, Safari, Edge)

Web server for full functionality (optional for local testing)
Usage Guide
For End Users
Enter Information

Fill in name and country (required)

Click "Generate Souvenir" to create unique Series ID

View Visuals

Observe your 2×2 digital mosaic

See your personalized water tank design

Complete Reflections

Answer the two reflective questions

Responses auto-save as you type

Share & Download

Download your complete souvenir package

Share on social media using the provided buttons

Scan QR code to see other contributors

For Administrators
User data is stored in local database

Series IDs are automatically generated

All media links and user info are structured in JSON format

Social sharing uses Open Graph protocols

Customization
Styling
Modify CSS variables in the <style> section:

css
:root {
  --primary-color: #1a2a6c;
  --secondary-color: #b21f1f;
  --accent-color: #fdbb2d;
}
Content
Update these sections in the HTML:

Header text and subtitle

Reflection questions

Social media sharing text

QR code destination URL

Footer content

Images
Replace placeholder images in the mosaic:

html
<div class="mosaic-item" style="background: url('your-image.jpg');">
Technical Details
Data Structure
javascript
userData = {
  seriesId: "WC-1a2b3c4d",
  name: "User Name",
  country: "Country",
  feeling: "Inspired",
  insight: "Learning about water conservation...",
  mosaicImages: ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"],
  waterTankImage: "water-tank.jpg",
  timestamp: "2024-01-15T10:30:00Z"
}
Dependencies
Font Awesome 6.4.0 (Icons)

QRCode.js (QR code generation)

Browser Compatibility
Chrome 60+

Firefox 55+

Safari 12+

Edge 79+
Debug Mode
Add this to enable console logging:

javascript
const DEBUG = true;
function debugLog(message) {
  if (DEBUG) console.log('DEBUG:', message);
}
Contributing
Fork the repository
Create a feature branch
Make your changes
Test thoroughly
Submit a pull request
Social media integration
QR code generation

