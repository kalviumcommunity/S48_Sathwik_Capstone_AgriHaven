# 🌿 AgriHaven

AgriHaven is a full-stack e-commerce web application built for agricultural products. It allows farmers and home gardeners to browse and purchase products like seeds, tools, manure, irrigation supplies, and pest control items — all in one place.

This project was built as a capstone project using the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## 🔗 Live Demo

> Deployed at: https://agrihaven-eight.vercel.app/

---

## ✨ Features

### For Users
- **Browse Products** — View all agricultural products with category filtering (Seeds, Tools, Manure, Irrigation, Pest Control)
- **Product Details** — See full product information including price, stock, supplier, and description
- **Shopping Cart** — Add/remove items and view the total before checkout
- **Place Orders** — Checkout and track order history from the Orders page
- **Authentication** — Register and log in securely using JWT-based authentication

### For Admins
- **Admin Dashboard** — Central panel to manage the platform
- **Manage Products** — View, add, edit, and delete products
- **Upload Product Images** — Upload product images directly from the admin panel
- **Manage Orders** — View and update the status of all customer orders
- **Manage Users** — View all registered users on the platform
- **Secure Admin Registration** — Admin accounts require a secret key during registration

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, React Router DOM v7, Vite |
| Backend    | Node.js, Express.js 5               |
| Database   | MongoDB with Mongoose                |
| Auth       | JWT (JSON Web Tokens), bcryptjs      |
| File Upload| Multer                              |
| Styling    | Vanilla CSS                         |

---

## 📁 Project Structure

```
AgriHaven/
├── backend/
│   ├── config/           # MongoDB connection setup
│   ├── controllers/      # Route handler logic
│   ├── middleware/        # JWT auth & admin role middleware
│   ├── models/           # Mongoose schemas (User, Product, Order, Cart)
│   ├── routes/           # API route definitions
│   │   ├── auth.js       # Register & Login
│   │   ├── products.js   # CRUD for products
│   │   ├── cart.js       # Cart operations
│   │   ├── orders.js     # Order placement & management
│   │   ├── upload.js     # Image upload via Multer
│   │   └── users.js      # User management (admin)
│   ├── uploads/          # Uploaded product images (local storage)
│   └── server.js         # Express app entry point
│
└── frontend/
    └── src/
        ├── components/   # Navbar, Footer, ProductCard, CartItem, AdminSidebar
        ├── context/      # AuthContext & CartContext (React Context API)
        ├── pages/        # All page components (Home, Products, Cart, Orders, Admin pages, etc.)
        ├── App.jsx        # Client-side routing
        └── main.jsx       # React app entry point
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance

---

### 1. Clone the Repository

```bash
git clone https://github.com/kalviumcommunity/S48_Sathwik_Capstone_AgriHaven.git
cd S48_Sathwik_Capstone_AgriHaven
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET=your_admin_registration_secret
PORT=5000
```

Start the backend server:

```bash
node server.js
```

The backend will run on **http://localhost:5000**

---

### 3. Set Up the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on **http://localhost:5173**

---

## 🔐 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint    | Access  | Description              |
|--------|-------------|---------|--------------------------|
| POST   | `/register` | Public  | Register a new user      |
| POST   | `/login`    | Public  | Login and receive a JWT  |

### Products (`/api/products`)
| Method | Endpoint  | Access       | Description              |
|--------|-----------|--------------|--------------------------|
| GET    | `/`       | Public       | Get all products (supports `?category=` filter) |
| GET    | `/:id`    | Public       | Get a single product     |
| POST   | `/`       | Admin only   | Create a new product     |
| PUT    | `/:id`    | Admin only   | Update a product         |
| DELETE | `/:id`    | Admin only   | Delete a product         |

### Upload (`/api/upload`)
| Method | Endpoint | Access     | Description                |
|--------|----------|------------|----------------------------|
| POST   | `/`      | Admin only | Upload a product image     |

### Cart (`/api/cart`)
| Method | Endpoint | Access         | Description          |
|--------|----------|----------------|----------------------|
| GET    | `/`      | Logged in user | Get user's cart      |
| POST   | `/`      | Logged in user | Add item to cart     |
| DELETE | `/:id`   | Logged in user | Remove item from cart|

### Orders (`/api/orders`)
| Method | Endpoint | Access         | Description               |
|--------|----------|----------------|---------------------------|
| GET    | `/`      | Logged in user | Get user's orders         |
| POST   | `/`      | Logged in user | Place a new order         |
| GET    | `/all`   | Admin only     | View all orders           |
| PUT    | `/:id`   | Admin only     | Update order status       |

### Users (`/api/users`)
| Method | Endpoint | Access     | Description           |
|--------|----------|------------|-----------------------|
| GET    | `/`      | Admin only | Get all users         |

---

## 🏪 Product Categories

The platform currently supports the following product categories:
- `seeds`
- `tools`
- `manure`
- `irrigation`
- `pest control`

---

## 👤 User Roles

| Role  | Permissions                                         |
|-------|-----------------------------------------------------|
| user  | Browse products, manage cart, place and view orders |
| admin | All user permissions + full product/order/user management |

> **Note:** To register as an admin, you must provide the correct `Admin Secret Key` during registration. This key is configured via the `ADMIN_SECRET` environment variable on the server.

---

## 🙋 Author

**Sathwik R**
Capstone Project | 2024–2025
