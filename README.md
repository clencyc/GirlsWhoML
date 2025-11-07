# 🌊 Resonance Collection

**Resonance Collection** is an interactive card-based web experience built with **HTML**, **CSS (Tailwind + Custom Styles)**, and **JavaScript**.  
Users can explore AI reflection stories, flip cards to reveal details, and collect up to four responses that resonate with them.  
Once their collection is full, they can proceed to view it in another scene (`scene3.html`).

---

## Project Structure

project/
│
├── screen2_cards.html # Main page with the card grid and modal
├── scene2_cards.js # Logic for cards, story data, flipping, and collection
├── scene2_cards.css # Styles for cards, layout, and animations
├── global.css # Optional global styles (if used)
└── assets/ # Folder for images (e.g. priya_sharma.jpeg, etc.)

yaml
Copy code

---

##  Features

### Interactive Card Flip
- Each card flips to reveal a story or reflection when clicked or pressed with **Enter/Space**.

###  View More Modal
- Long stories show a “**View More**” link — clicking it opens a modal displaying the full text.

###  Collect System
- Users can collect up to **4 responses**.  
- Collected cards are **highlighted**.  
- Progress is displayed in the **collection bar (0/4)**.  
- A “**View Your Collection**” button appears once all four are collected.

###  Persistent State
- The collection is stored in **localStorage** under:
  - `girlswhoml_collection` → List of collected stories  
  - `selected_collection` → Collection passed to the next scene

###  Accessibility
- Supports **keyboard navigation** (flip with Enter or Space).  
- Visually distinct states for collected items.

---

##  Login / Data Loading

The screen currently does **not include a backend login system** — instead, it uses mock data defined in `scene2_cards.js`:

```js
const MOCK_RESPONSES = [
  {
    id: "r1",
    answer: "Bodies Left Behind in the Code",
    name: "Priya Sharma",
    occupation: "AI Ethics Researcher, India",
    image: "priya_sharma.jpeg",
    story: `In a small clinic outside Bhopal...`
  },
 
];
Each response object includes:

| Field        | Description                                               |
| ------------ | --------------------------------------------------------- |
| `id`         | Unique identifier                                         |
| `answer`     | Card title / short prompt                                 |
| `name`       | Contributor name                                          |
| `occupation` | Their role                                                |
| `image`      | Image filename (stored in assets/) *(not functional yet)* |
| `story`      | Full story text                                           |


If connected to a backend, these could be fetched via an API call such as:

js
Copy code
fetch('/api/mock/stories');
⚙️ How It Works
Load the page (screen2_cards.html)

Cards are dynamically generated from MOCK_RESPONSES in scene2_cards.js.

Flip a card

Click or press Enter/Space to flip and reveal the back face.

Read more

If the story exceeds 300 characters, a “View More” link appears to open a modal with the full story.

Collect a response

Click “Collect This Response” to add it to your collection.

The card visually changes and a ✓ appears.

View collection

Once four responses are collected, a “View Your Collection” button appears.

Clicking it saves your collection to localStorage and redirects to scene3.html.

Running Locally
Clone or download the project folder.

Place all files (HTML, CSS, JS, images) in the same directory.

Open screen2_cards.html in your browser.

No server setup is needed — it runs entirely in the browser.

Dependencies
Tailwind CSS (via CDN)

A modern browser supporting ES6 modules and localStorage.

Future Enhancements
Connect to a real backend API for live story data.

Enable image loading for contributors.

Add animations and sound effects for enhanced interaction.