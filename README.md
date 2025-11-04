# [🖥️] : scene 3 -> 4 -> 5(websitetrack) integration

//websitetrack service integrates the Scene 3 processing pipeline, 
serves Scene 4 static UI, 
and exposes a single HTTP entrypoint for the frontend to generate and share results.

## [A] : What this does

  - Adds a new POST endpoint at /api/integration that:
  - Accepts image_urls, name, country, screenshot_url from the frontend.
  - Runs Scene 3’s create_complete_souvenir to generate a mosaic, series ID, and related assets.
  - Uploads the mosaic (and optional screenshot) to backendTask /contributors/.
  - Returns a share_url for the frontend to navigate to the conclusion/share page.

## [B] :File locations

- Scene 3 (Python package; must be importable):
  - scene3/
    - __init__.py
    - main_script.py
    - mosaic_export.py
    - qr_generator.py
    - series_id_generator.py

- Scene 5 (websitetrack):
  - app/api/integration.py (the new FastAPI endpoint)
  - app/… (Next.js pages)
  - public/… (static assets; optional Scene 4 HTML/CSS if served as-is)

## [C] : Endpoint code

Place integration.py in websitetrack/app/api/integration.py.

## [D] : Register the router

Include main.py in websitetrack/app/main.py.


## [E] : Environment variables

Set these in your websitetrack environment:

- BACKEND_URL: address of backendTask (e.g., http://localhost:8000)
- BASE_URL: public-facing series base (e.g., https://yourwebsite.com/series/)
- FRONTEND_URL: base of the website (e.g., http://localhost:3000)
- For Next.js fetching: NEXT_PUBLIC_BACKEND_URL as and when needed

## [F] : Scene 4 options

- Static: copy Conclusion-Page.html and Conclusion-Page.css to public/ and serve at /conclusion-page.html, with CSS at /conclusion-page.css.
- Dynamic (recommended): create app/contributors/[id]/share/page.js to fetch contributor data from the backend and render a React version styled by your Scene 4 CSS.

## [G] : Typical flow

- Frontend POSTs to /api/integration with the user’s image_urls, name, country, screenshot_url.
- Endpoint runs Scene 3, uploads results, and returns share_url.
- Frontend navigates to share_url (/contributors/{id}/share).
- The share page (Scene 4 UI) loads contributor data and displays the mosaic, QR, and metadata.

## TODO 

- [X] Finish integration.py (3->5)
- [ ] Add __init__.py inside scene3/ so imports like from scene3.main_script import create_complete_souvenir work.
- [ ] Confirm Scene 3 returns result["series_id"] and result["mosaic"]["local_path"] from create_complete_souvenir.
- [ ] Verify backendTask /contributors/ accepts files=mosaic/screenshot and form fields name, country, series_id.
- [ ] Create the share page route: app/contributors/[id]/share/page.(js|tsx) and render Scene 4 UI using your CSS.
- [ ] Add NEXT_PUBLIC_BACKEND_URL in websitetrack .env.local if the share page fetches from backend in the browser or via SSR.
- [ ] Configure CORS on backendTask if websitetrack (different origin) fetches it directly.
- [ ] Add input validation on image_urls (length, URL format) and enforce reasonable size/timeouts.
