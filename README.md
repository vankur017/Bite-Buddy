# 🧠 Getting Started – BiteBuddy 


## 🌐 Frontend Server (React + Parcel)

### 1. Navigate to the frontend directory:

```bash
cd frontend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start the frontend server:

```bash
npm start
```

> The app will be available at:

```
http://localhost:1234
```

### 📁 Folder Structure Notes:

- Frontend should contain:
  - `src/components/` for UI components
  - `utils/` for constants, Redux slices, and Firebase config
  - Use Parcel or Vite as bundler

---

## 📌 Additional Notes:

- Ensure backend and frontend are running in **parallel**.
- Keep menu fixture files in `functions/mock-menus/` so the Firebase function can serve them consistently.
- The frontend should call the hosted API routes instead of reading `public/menus` directly.

Example fetch from React:

```js
fetch(`${API_URL}/api/menu?restaurantId=8614`)
```
