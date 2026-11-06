# Seatly - Interactive Cinema Ticketing

Seatly is a responsive front-end cinema booking project built with HTML5, CSS3, vanilla JavaScript, and `localStorage`. It models a 200-seat auditorium and keeps the seat map, inspection panel, and shopping cart synchronized.

## Run the project

No installation or build step is required.

1. Download or clone the repository.
2. Open `index.html` in a modern browser.

For the most consistent local testing, start a small web server in the project folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Venue design

The auditorium has 200 seats across four price zones:

| Zone | Rows | Seats | Price |
| --- | --- | ---: | ---: |
| VIP | A-D | 40 | 32 AZN |
| Premium | E-H | 56 | 24 AZN |
| Standard | I-N | 84 | 16 AZN |
| Economy | O-P | 20 | 10 AZN |

Seventeen seats begin as unavailable. The remaining seats can be inspected and added to the cart.

## Main functionality

- Generates all 200 seat buttons from the venue model in `js/data.js`.
- Treats a seat click as inspection only; the cart changes only through **Add to cart**.
- Shows available, inspected, in-cart, and unavailable states.
- Provides Zoom In, Zoom Out, Move Up, Move Down, Move Left, Move Right, and Center View controls.
- Prevents duplicate tickets and prevents unavailable seats from being selected.
- Removes tickets while immediately updating the corresponding seat.
- Calculates the total in AZN.
- Saves the cart in `localStorage` and restores matching map states after refresh.
- Adapts the interface for desktop, tablet, and phone widths.
- Uses semantic buttons, focus styles, descriptive labels, and live status messages.

## How the JavaScript works

`js/data.js` contains one `venueData` object. Each section defines its rows, number of seats per row, price, and description. `createSeatData()` expands those compact section definitions into 200 seat objects, each with a stable ID such as `E7`.

`js/script.js` loops over the sections and rows to create individual seat buttons. The application state stores the inspected seat, cart items, and map transform. Rendering functions update the seat classes, details panel, ticket list, count, and total. Only small `{ id, price }` cart records are saved to `localStorage`; saved IDs are checked against the current venue data before they are restored.

## Project structure

```text
interactive-cinema-ticketing/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── script.js
└── README.md
```

## Verification checklist

- [x] Substantial venue map with four zones and different prices
- [x] Repeated seats generated from JavaScript data
- [x] Individual accessible button for every seat
- [x] Inspection does not modify the cart
- [x] Explicit Add to cart action
- [x] Four required seat states
- [x] Seven required map navigation controls
- [x] Ticket removal and correct total calculation
- [x] Duplicate prevention
- [x] Map/cart synchronization
- [x] Cart and map-state restoration after refresh
- [x] Unavailable seats cannot be added
- [x] Responsive desktop, tablet, and mobile layouts
- [x] No mouse-wheel zoom or drag-to-pan bonus claimed

Browser testing covered inspection without cart changes, adding two price categories, duplicate blocking, removal, total updates, refresh restoration, unavailable buttons, all seven navigation controls, a 390 px mobile viewport, and browser console errors.

## 4-6 minute demonstration outline

1. Introduce Seatly Hall One, its four zones, 200 seats, and AZN prices.
2. Demonstrate Zoom In, Zoom Out, all four movement buttons, and Center View.
3. Click an available seat and point out that details appear while the cart remains empty.
4. Press **Add to cart** and show the seat and ticket changing together.
5. Inspect and add a seat from another price zone.
6. Revisit an in-cart seat and show the disabled **Already in cart** button.
7. Remove one ticket and show the seat return to its available state.
8. Refresh the page and show that the remaining ticket and seat state are restored.
9. Point out a crossed-out unavailable seat and its disabled control.
10. Resize the browser or use device view to show the mobile layout.
11. Open `js/data.js` and explain how section definitions generate all seats.
12. Close by confirming that the optional mouse-navigation bonus is not claimed.

## Submission notes

- Repository target: `https://github.com/suelheybatova1/interactive-cinema-ticketing`
- Demo video URL: `[ADD PUBLIC ONEDRIVE VIDEO URL]`
- Final submitted commit: record the exact hash shown by `git rev-parse HEAD`
- Ensure automatic subtitles are enabled and available on the uploaded video.
- The repository, video, and report must all demonstrate the same final version.

## Technology

HTML5, CSS3, vanilla JavaScript, and browser `localStorage`. No framework, database, authentication, payment system, or external JavaScript library is used.
