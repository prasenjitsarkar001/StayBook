# 🏡 StayBook - Rental Listing Platform

StayBook is a full-stack web application that allows users to explore, create, and manage property listings. Users can register, log in, upload images, and perform CRUD operations on listings.

---

## 🚀 Live Demo
👉 https://staybook-g8vr.onrender.com

---

## ✨ Features

- 🔐 User Authentication (Signup/Login/Logout)
- 🏠 Create, Edit, Delete Listings
- 📸 Image Upload with Cloudinary
- 💬 Flash Messages for user feedback
- 🔎 Browse all listings
- 🧑‍💼 Owner-based authorization (only owner can edit/delete)
- ☁️ MongoDB Atlas database
- 🌐 Deployed on Render

---

## 🛠️ Tech Stack

### Frontend
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- Passport.js
- Passport-Local-Mongoose

### File Upload
- Multer
- Cloudinary

---

## 📂 Project Structure
```text
staybook/
├── controller/     # Business logic & route handlers
├── init/           # Database seed scripts & initialization
├── models/         # Mongoose schemas & data models
├── public/         # Static files (CSS, JS, Images)
├── routes/         # Express route definitions
├── utils/          # Utility functions & helper classes
├── views/          # EJS templates (UI)
├── .env            # Environment variables (not tracked)
├── .gitignore      # Files ignored by Git
├── app.js          # Main entry point of the server
├── cloudConfig.js  # Cloudinary configuration
├── middleware.js   # Custom middleware functions
├── package.json    # Project dependencies & scripts
└── schema.js       # Validation schemas (e.g., Joi)

```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/staybook.git
cd staybook
```

### 2. Install dependencies
npm install

### Run the app
- node app.js

- or

- nodemon app.js

### 🌱 Seed Database (Optional)
- node init/index.js

### 🔐 Authentication Flow
- User signup & login handled using Passport.js
- Sessions stored in MongoDB using connect-mongo

### 📸 Image Upload
- Uses Multer + Cloudinary
- Image URL stored in MongoDB

### 🚀 Deployment
- Hosted on Render
- MongoDB Atlas used for database
- Environment variables configured in Render dashboard

### ⚠️ Important Notes
- .env file is not pushed to GitHub
- Keep API keys secure
- Enable MongoDB Atlas network access (0.0.0.0/0)

### 🧠 Future Improvements

- 📍 Map Integration
- 🔍 Search & Filters
- ❤️ Wishlist Feature

### 👨‍💻 Author

Prasenjit Sarkar

### 📜 License

This project is for educational purposes.



