# Admin Panel — Food Delivery (Admin)

This folder contains the React-based admin panel used to manage food items and orders for the Food Delivery application.

## Overview

Small Vite + React app for admin tasks:

- Add/remove food items (image upload supported)
- View and manage orders

Default backend base URL: `http://localhost:4000` (see `src/App.jsx`).

## Run (dev)

```powershell
cd 'c:\Users\shrey\Downloads\Food-Delivery-main (1)\Food-Delivery-main\admin'
npm install
npm run dev
```

Build / preview:

```powershell
npm run build
npm run preview
```

## Scripts

- `dev` — vite dev server
- `build` — create production build
- `preview` — preview production build
- `lint` — run ESLint

## Key files

- `src/App.jsx` — contains routes, `ToastContainer`, `Navbar` and `Sidebar`
- `src/context/StoreContext.jsx` — manages `token` and `admin` state (reads `localStorage`)
- `src/pages/Add/Add.jsx` — `POST /api/food/add` (multipart/form-data)
- `src/pages/List/List.jsx` — `GET /api/food/list`, `POST /api/food/remove`
- `src/pages/Orders/Orders.jsx` — `GET /api/order/list`, `POST /api/order/status`

## Auth

Admin auth relies on `localStorage` keys: `token` and `admin`. For quick testing you can set these in the browser console:

```javascript
localStorage.setItem("token", "<token>");
localStorage.setItem("admin", "true");
```

## Notifications

Uses `react-toastify`; `ToastContainer` is already included in `src/App.jsx`.

## API summary

- POST `/api/food/add` — add new food (multipart form)
- GET `/api/food/list` — list foods
- POST `/api/food/remove` — remove food (`{ id }`)
- GET `/api/order/list` — list orders
- POST `/api/order/status` — update order status (`{ orderId, status }`)

## Notes

- Images are served from `/images/<filename>` on the backend.
- Consider moving the backend URL into `VITE_API_URL` (env) if it varies by environment.

---

If you'd like, I can:

- Extract the API base URL to an env variable and update the app to read it.
- Add short contributing instructions or a CONTRIBUTING.md.

# Admin Panel — Food Delivery (Admin)

This folder contains the React-based admin panel used to manage food items and orders for the Food Delivery application.

## Admin Password and Email

- Email: admin@example.com
- Password : Admin@12345

## Overview

The admin panel is a small Vite + React app that provides UI for:

- Adding new food items (including image upload)

# Admin Panel — Food Delivery (Admin)

This folder contains the React-based admin panel used to manage food items and orders for the Food Delivery application.

## Admin Password and Email

- Email: admin@example.com
- Password : Admin@12345

## Overview

The admin panel is a small Vite + React app that provides UI for:

- Adding new food items (including image upload)
- Viewing and removing food items
- Viewing and updating order statuses

It talks to the backend API (default: `http://localhost:4000`) using axios and expects a JWT-style `token` and an `admin` flag stored in `localStorage` for authentication/authorization.

## Tech stack

- React 18
- Vite (dev server + build)
- axios for HTTP requests
- react-toastify for notifications
- ESLint for linting

## Quick start (development)

Open a PowerShell terminal and run:

````powershell
cd 'c:\Users\shrey\Downloads\Food-Delivery-main (1)\Food-Delivery-main\admin'
npm install
# Admin Panel — Food Delivery (Admin)

This folder contains the React-based admin panel used to manage food items and orders for the Food Delivery application.

## Admin Password and Email

- Email: admin@example.com
- Password : Admin@12345

## Overview

The admin panel is a small Vite + React app that provides UI for:

- Adding new food items (including image upload)
- Viewing and removing food items
- Viewing and updating order statuses

It talks to the backend API (default: `http://localhost:4000`) using axios and expects a JWT-style `token` and an `admin` flag stored in `localStorage` for authentication/authorization.

## Tech stack

- React 18
- Vite (dev server + build)
- axios for HTTP requests
- react-toastify for notifications
- ESLint for linting

## Quick start (development)

Open a PowerShell terminal and run:

```powershell
cd 'c:\Users\shrey\Downloads\Food-Delivery-main (1)\Food-Delivery-main\admin'
npm install
npm run dev
````

The admin UI will be served by Vite (default port shown in the terminal). The app expects the backend API to be available at `http://localhost:4000` by default — see `src/App.jsx` where `url` is currently set.

## Build and preview

```powershell
npm run build
npm run preview
```

## Available scripts

- `npm run dev` — start Vite dev server
- `npm run build` — produce production build
- `npm run preview` — serve production build locally
- `npm run lint` — run ESLint

## Project structure (important files)

- `index.html` — Vite HTML entry
- `src/App.jsx` — top-level app; mounts `ToastContainer`, `Navbar`, `Sidebar`, and routes for pages
- `src/main.jsx` — React entry (wires ReactDOM and Router)
- `src/context/StoreContext.jsx` — minimal context for `token` and `admin` state (reads from `localStorage`)

### Components

- `src/components/Login/` — login UI used at `/` route for admin authentication
- `src/components/Navbar/` — top navigation
- `src/components/Sidebar/` — side navigation for admin pages

### Pages

- `src/pages/Add/Add.jsx` — form to add a food item (sends `POST /api/food/add` with multipart/form-data). Requires `token` header.
- `src/pages/List/List.jsx` — lists foods; calls `GET /api/food/list` and `POST /api/food/remove` (requires `token` header) to remove
- `src/pages/Orders/Orders.jsx` — lists orders (`GET /api/order/list`) and updates status (`POST /api/order/status`). Requires `token` header.

### Assets & images

- Images uploaded from the admin are saved on the backend and served from `/images/<filename>`; the list page composes image urls as `${url}/images/${image}`.

## Authentication / Authorization

The admin app expects to receive and store a token in `localStorage` under the key `token`. In addition, a local `admin` flag is expected (also stored in `localStorage`) to gate admin routes. Several pages check for both `token` and `admin` in `StoreContext` and redirect to the login page with a toast if missing.

If you need to seed an admin user manually while testing, you can set these keys in the browser DevTools console:

```javascript
localStorage.setItem("token", "<your-jwt-or-token>");
localStorage.setItem("admin", "true");
```

## Notifications

The app uses `react-toastify`. `ToastContainer` is already included in `src/App.jsx`, and each page/component calls `toast.success(...)` or `toast.error(...)` as appropriate.

## API endpoints used (summary)

- POST `/api/food/add` — add new food (multipart/form-data with `image`, `name`, `description`, `price`, `category`). Requires `token` header.
- GET `/api/food/list` — list all foods
- POST `/api/food/remove` — remove food (payload `{ id }`). Requires `token` header.
- GET `/api/order/list` — list all orders (admin). Requires `token` header.
- POST `/api/order/status` — update order status (payload `{ orderId, status }`). Requires `token` header.

These endpoints are implemented in the backend `routes`/`controllers` (see `../backend/`). Adjust the base `url` in `src/App.jsx` if your backend runs elsewhere.

## Development tips

- If you change the backend base URL frequently, consider moving `url` into an environment variable and reading it via `import.meta.env.VITE_API_URL`.
- Keep `react-toastify` CSS imported (already done in `src/App.jsx`).
- Use the browser Network tab to inspect the multipart/form-data payload for image uploads.

## Linting

Run `npm run lint` to check code style with ESLint. The project includes `eslint-plugin-react` and `react-hooks` rules.

## Troubleshooting

- If images show as broken on the list page, verify the backend static images folder and the `image` filename returned by the API.
- If requests return 401/403, confirm the `token` in `localStorage` and that the backend's auth middleware is configured correctly.

## Contributing / Extending

- Add more admin features (edit food item, pagination, filters) under `src/pages/` and wire routes in `src/App.jsx`.
- For global state beyond `token` / `admin`, extend `StoreContext` or introduce a state management solution (Redux, Zustand) if needed.

---

If you'd like, I can also:

- Extract the API base URL into a Vite env variable and update code accordingly.
- Add a small admin README badge or a CONTRIBUTING.md for contribution guidelines.
