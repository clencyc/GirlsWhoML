# Digital Souvenir Platform - README

## Overview
The Digital Souvenir Platform is a web application that allows users to create personalized digital souvenirs, reflect on their experience, and share their creations on social media. It's designed for interactive installations, exhibitions, or conservation awareness campaigns.

## Features

### 🎨 Visual Components
- **2×2 Digital Souvenir Mosaic**: Four-panel visual representation of user's journey
- **Interactive Water Tank**: Visual water level indicator with customizable design
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📝 User Interaction
- **User Information Collection**: Name and country (mandatory fields)
- **Reflective Questions**: 
  1. "What word best describes how you feel after exploring our installation?"
  2. "What is one insight/learning/reflection that you'll take away with you?"
- **Auto-save Functionality**: Responses are saved automatically as users type

### 🔗 Social & Sharing
- **Social Media Integration**: Share buttons for Instagram, Twitter, Facebook, and LinkedIn
- **QR Code Generation**: Directs users to contributor gallery
- **Download Capability**: Export souvenir and reflections

### 💾 Data Management
- **Series ID Generation**: Unique identifier for each user session
- **Local Storage**: Saves user data in browser
- **Structured Data Storage**: Organizes user info, responses, and media links

## File Structure
```
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
```


**Note**: This is a frontend-only implementation. For production use with user data persistence, consider adding a backend database solution.
