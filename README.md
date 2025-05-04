
# 🌐 Country Explorer

A React + Vite application to explore countries around the world.  
Features include Google Sign-In, favorites persisted in Firebase Firestore, search & filter via REST Countries API, and a responsive Tailwind CSS UI.  
Live Demo: https://country-app-23fc6.web.app

---

## 📋 Table of Contents

1. [Features](#-features)  
2. [Tech Stack](#-tech-stack)  
3. [Live Demo](#-live-demo)  
4. [Prerequisites](#-prerequisites)  
5. [Setup & Installation](#-setup--installation)  
6. [Firebase Configuration](#-firebase-configuration)  
7. [Environment Variables](#-environment-variables)  
8. [Running Locally](#-running-locally)  
9. [Testing](#-testing)  
10. [Building for Production](#-building-for-production)  
11. [Deployment](#-deployment)  
12. [Project Structure](#-project-structure)  
13. [Future Improvements](#-future-improvements)  
14. [Assignment Report](#-assignment-report)

---

## 🚀 Features

- **Browse all countries** via `GET /all`  
- **Search by name** (`GET /name/{name}`)  
- **Filter by region** (`GET /region/{region}`)  
- **Country details** (`GET /alpha/{code}`): flag, capital, population, languages, borders  
- **Google Authentication** with Firebase Auth  
- **Favorites** saved in Firestore and auto-restored on login  
- **Responsive design** (mobile ➡️ desktop)  
- **Client-side routing** (React Router v7)  
- **Unit & integration tests** with Vitest + Testing Library

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite  
- **Styling**: Tailwind CSS  
- **Routing**: react-router-dom v7  
- **Auth & DB**: Firebase Auth & Firestore  
- **Testing**: Vitest, @testing-library/react, jsdom  
- **Hosting**: Firebase Hosting  

---

## 🔗 Live Demo

The app is deployed at:

> **https://country-app-23fc6.web.app**

---

## ⚙️ Prerequisites

- Node.js ≥16, npm  
- Firebase CLI (`npm install -g firebase-tools`)  
- (Optional) Git & GitHub account  

---

## 🔧 Setup & Installation

1. **Clone your Classroom repo**  
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-thyagaalwis.git
   cd af-2-thyagaalwis/Frontend
````

2. **Install dependencies**

   ```bash
   npm install
   ```

---

## 🔑 Firebase Configuration

Copy this into `src/firebase.js`:

```js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_GG3pnuB4japSdk3J19t56rj3vOxGqis",
  authDomain: "country-app-23fc6.firebaseapp.com",
  projectId: "country-app-23fc6",
  storageBucket: "country-app-23fc6.firebasestorage.app",
  messagingSenderId: "463282194438",
  appId: "1:463282194438:web:f452cd6686c5346d15db87",
  measurementId: "G-JYE2514FCM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
```

---

## 📝 Environment Variables

Create a `.env` file in `Frontend/`:

```dotenv
VITE_FIREBASE_API_KEY=AIzaSyB_GG3pnuB4japSdk3J19t56rj3vOxGqis
VITE_FIREBASE_AUTH_DOMAIN=country-app-23fc6.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=country-app-23fc6
VITE_FIREBASE_STORAGE_BUCKET=country-app-23fc6.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=463282194438
VITE_FIREBASE_APP_ID=1:463282194438:web:f452cd6686c5346d15db87
VITE_FIREBASE_MEASUREMENT_ID=G-JYE2514FCM
```

> **Note**: `.env` is already in `.gitignore`.

---

## ▶️ Running Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Testing

* **Run all tests once:**

  ```bash
  npm run test
  ```
* **Watch mode:**

  ```bash
  npm run test:watch
  ```
* **Coverage report:**

  ```bash
  npm run coverage
  ```

---

## 📦 Building for Production

```bash
npm run build
```

Optimized files are output to `dist/`.

---

## 🛳 Deployment

1. **Login & init** (only first time):

   ```bash
   firebase login
   firebase init hosting
   # Select your project, set `dist` as public, enable SPA rewrites
   ```
2. **Deploy**:

   ```bash
   npm run build
   firebase deploy --only hosting
   ```
3. **Live URL**:
   [https://country-app-23fc6.web.app](https://country-app-23fc6.web.app)

---

## 🗂 Project Structure

```
af-2-thyagaalwis/
├─ Frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ api/               REST Countries fetch helpers
│  │  ├─ components/        UI components (Navbar, CountryCard…)
│  │  ├─ contexts/          AuthContext for Firebase
│  │  ├─ hooks/             useFavorites hook
│  │  ├─ pages/             Routes: Home, Login, Details, Favorites
│  │  ├─ tests/             Vitest + Testing Library
│  │  ├─ firebase.js        Firebase init
│  │  ├─ App.jsx            Main app & router
│  │  └─ main.jsx           Vite entry
│  ├─ .env                  Vite env vars
│  ├─ tailwind.config.js
│  ├─ vite.config.js
│  └─ package.json
└─ README.md
```

---

## 🔮 Future Improvements

* Full Firestore integration for real-time sync
* Language filter (using `/lang/{code}`)
* Dark mode toggle
* Error & loading states for all API calls
* Integration tests for user flows

---

## 📄 Assignment Report

Please refer to `REPORT.md` for:

* **Chosen endpoints**: `/all`, `/name`, `/region`, `/alpha`
* **Challenges & Solutions**
* **Testing strategy**
* **Deployment notes**

---
