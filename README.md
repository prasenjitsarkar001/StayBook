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
- 💳 Razorpay payment integration
- 🏨 Booking and reservation system
- 📋 Booking confirmation and booking history
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

### Payments
- Razorpay
- Razorpay Orders API
- Razorpay Payment Signature Verification

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

### Payments Cards Details
| Network | Card Number | Card Type | Card Sub Type | CVV & Expiry Date |
| :--- | :--- | :--- | :--- | :--- |
| Visa | 4100 2800 0000 1007 | Debit | Consumer | Use a random CVV and any future date |
| Mastercard | 5555 5100 0008 1006 | Credit | Business | Use a random CVV and any future date |
| Mastercard | 5180 2872 0009 1001 | Prepaid | Consumer | Use a random CVV and any future date |
| RuPay | 6527 6589 0000 1005 | Credit | Consumer | Use a random CVV and any future date |
| Diners | 3608 280009 1007 | Credit | Consumer | Use a random CVV and any future date |

### 🧠 Future Improvements

- 📍 Map Integration
- 🔍 Search & Filters
- ❤️ Wishlist Feature

### 👨‍💻 Author

Prasenjit Sarkar

### 📜 License

This project is for educational purposes.



