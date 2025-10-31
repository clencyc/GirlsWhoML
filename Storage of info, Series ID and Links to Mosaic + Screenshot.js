Data Storage Structure
javascript
// Data object to be stored
const userData = {
    seriesId: generateSeriesID(), // Auto-generated unique ID
    timestamp: new Date().toISOString(),
    userInfo: {
        name: document.getElementById('userName').value,
        country: document.getElementById('userCountry').value
    },
    mediaLinks: {
        mosaic: {
            image1: "link_to_mosaic_1",
            image2: "link_to_mosaic_2", 
            image3: "link_to_mosaic_3",
            image4: "link_to_mosaic_4",
            fullMosaic: "link_to_combined_mosaic"
        },
        waterTank: "link_to_water_tank_screenshot"
    },
    metadata: {
        ipAddress: "user_ip",
        userAgent: "browser_info"
    }
};

// Store data (example using localStorage + backend API)
function storeUserData(userData) {
    // Frontend storage
    localStorage.setItem('userSouvenir', JSON.stringify(userData));
    
    // Backend API call
    fetch('/api/store-souvenir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
}

