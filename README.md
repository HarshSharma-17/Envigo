# 🚗 EnviGo – Smart EV Management App

EnviGo is a full-stack mobile application built using **React Native (Expo)** and **Firebase** that helps users manage their electric vehicles efficiently. It provides authentication, vehicle tracking, and a scalable backend for future smart mobility features.

---

## 📱 Features

### 🔐 Authentication

* Email & Password login/signup
* Google Sign-In integration
* Auto-login (persistent sessions)

### 👤 User Profile

* Dynamic profile data (name, email, phone)
* Data stored in Firebase Firestore
* Logout functionality

### 🚗 Vehicle Management

* Add vehicles with details (battery, range, power)
* Store vehicles in Firestore (per user)
* View saved vehicles dynamically
* Clean and modern UI

### ☁️ Backend (Firebase)

* Firebase Authentication
* Firestore Database (NoSQL)
* Real-time scalable structure

---

## 🛠️ Tech Stack

* **Frontend:** React Native (Expo)
* **Backend:** Firebase (Auth + Firestore)
* **Navigation:** Expo Router
* **Language:** TypeScript
* **UI:** Custom design with Poppins font

---

## 📂 Project Structure

```
app/
 ├── (auth)/
 │    ├── login.tsx
 │    ├── signup.tsx
 │    ├── onboard.tsx
 │
 ├── (tabs)/
 │    ├── index.tsx
 │    ├── profile.tsx
 │    ├── addVehicle.tsx
 │    ├── map.tsx
 │
 ├── vehicle.tsx
 │
config/
 ├── firebase.ts
```

---

## 🔥 Firestore Structure

```
users
 └── userUID
      ├── firstName
      ├── lastName
      ├── email
      ├── phone
      └── vehicles
           └── vehicleId
                ├── name
                ├── battery
                ├── range
                ├── power
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/envigo.git
cd envigo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

* Create Firebase project
* Enable:

  * Authentication (Email + Google)
  * Firestore Database
* Add your config in:

```ts
config/firebase.ts
```

---

### 4. Run the App

```bash
npm start
```

---

## 📸 Screens (Optional)

* Splash Screen
* Signup/Login
* Profile
* Vehicle Management

*(Add screenshots here later)*

---

## 🚀 Future Enhancements

* 🔁 Real-time vehicle updates
* ❌ Delete & edit vehicles
* 🗺️ EV charging station map integration
* 💰 EnviCoins reward system
* 🔔 Notifications (battery alerts)
* 📊 Vehicle analytics dashboard

---

## 🎯 Learning Outcomes

* Full-stack mobile app development
* Firebase integration (Auth + Firestore)
* State management and navigation
* Clean UI/UX design

---
