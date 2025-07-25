# 🧠 Getting Started – BiteBuddy Fullstack Setup

## 📦 Backend Server (Express + Stripe + Firebase)

### 1. Navigate to the backend directory:

```bash
cd backend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start the backend server:

```bash
npm start
```

> This will start your backend server at:

```
http://localhost:4200
```

### 📂 Folder Structure Notes:

- The backend should contain:
  - `server.js` or `index.js`
  - `serviceAccountKey.json` (Firebase admin SDK key)
  - `.env` with:
    ```env
    STRIPE_SECRET_KEY=your_stripe_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    ```

---

## 💳 Dummy Payment Details (Stripe Testing)

Use the following **test card** for Stripe payments:

- **Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: Any **future** date (MM/YY)
- **CVV**: Any 3 digits (e.g., `123`)

---

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

---

