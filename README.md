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
- Keep your `menus/*.json` files inside `frontend/public/menus/`.
- Do **not** prefix fetch calls with `/public`.

Example fetch from React:

```js
fetch(`/menus/8614.json`)
```
