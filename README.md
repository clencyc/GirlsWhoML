# Digital Souvenir Platform - README
🌟 Overview
A web application that allows users to create digital souvenirs, reflect on their experiences, and contribute to the Girls Who ML database. Perfect for community events, exhibitions, and AI awareness campaigns.

🚀 Features
🎨 Visual Components
2×2 Digital Mosaic: Interactive visual representation

Animated Water Tank: Visual contribution indicator

Responsive Design: Works on all devices

📝 User Interaction
User Information Collection: Name, country, and AI narrative

Reflective Questions:

Feeling word about AI future

Key insight/learning

Auto-save: Responses saved automatically

🔗 API Integration
Girls Who ML Database: Connects to https://girlswhoml.onrender.com

Real-time Submission: POST to /contributors/ endpoint

Error Handling: Fallback to localStorage

📱 Social Features
Social Media Sharing: Instagram, Twitter, Facebook, LinkedIn

QR Code Generation: Links to community gallery

Download Option: Export contribution data

🛠 Installation
Quick Start
Download the HTML file

Open in any modern web browser

No additional setup required!

File Structure
text
digital-souvenir/
├── index.html (main file)
└── assets/ (optional)
    ├── images/
    └── styles/
📋 Usage
For Participants
Enter Information

Fill name, country, and AI narrative (required)

Complete reflection questions

Submit Contribution

Click "Submit to Girls Who ML"

Get unique contribution ID

Data sent to API database

Share & Download

Share on social media

Download JSON backup

Scan QR code for community gallery

For Organizers
Set up at events with tablets/computers

Share link for remote participation

Monitor API submissions

🔧 Technical Details
API Integration
javascript
const API_BASE_URL = 'https://girlswhoml.onrender.com';
const endpoint = '/contributors/';

// Data structure sent to API
{
  "contribution_id": "GWM-timestamp-random",
  "name": "User Name",
  "country": "Country",
  "narrative": "AI vision story",
  "feeling_word": "Inspired",
  "key_insight": "Learning about AI",
  "mosaic_images": ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"],
  "water_tank_image": "visual.jpg",
  "submitted_at": "ISO timestamp"
}
Data Storage
Primary: Girls Who ML API

Fallback: Browser localStorage

Export: JSON file download

Dependencies
Font Awesome 6.4.0 (icons)

QRCode.js (QR generation)

Modern browser with ES6+ support

🎨 Customization
Styling
Modify CSS variables for branding:

css
--primary-color: #667eea;
--secondary-color: #764ba2;
Content
Update:

Header titles and subtitles

Reflection questions

Social sharing messages

QR code destination

Images
Replace mosaic placeholders with actual images:

html
<div class="mosaic-item" style="background: url('your-image.jpg');">
🔄 Workflow
User Input → Form validation

Data Preparation → JSON formatting

API Submission → POST to Girls Who ML

Fallback Handling → localStorage + download

User Feedback → Status messages

Sharing → Social media + QR code

🐛 Troubleshooting
Common Issues
API Connection Failed: Uses localStorage fallback

Form Validation: Required fields highlighted

Social Sharing: Pre-filled messages provided

Debug Mode
Add to browser console:

javascript
localStorage.setItem('debug', 'true');
📊 Monitoring
Success Indicators
API status messages

Contribution ID generation

Local storage confirmation

Download file creation

Analytics (Optional)
Add Google Analytics or similar for:

Submission counts

Country distribution

Popular reflection words

🌍 Deployment
Simple Hosting
Upload to any web server

GitHub Pages

Netlify/Vercel

Advanced Setup
Custom domain

SSL certificate

API monitoring

Database backups

🤝 Contributing
Fork repository

Create feature branch

Test changes

Submit pull request

📞 Support
For Technical Issues
Check browser console for errors

Verify API endpoint availability

Test with different browsers

For Users
Clear form validation messages

Auto-save indicators

Download fallback option

📄 License
MIT License - feel free to modify for your needs.

Ready to use immediately! Just open the HTML file in a browser and start collecting contributions. 🎯

🔄 Version History
v1.0: Initial release with API integration

v1.1: Added offline fallback and enhanced UI

v1.2: Social sharing and QR code features
Make your changes
Test thoroughly
Submit a pull request
Social media integration
QR code generation

