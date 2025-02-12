# 📌 Finance Tracker Backend

Welcome to the **Finance Tracker Backend**! This backend is built using **Node.js**, **Express**, and **TypeScript**, and it connects to a **MySQL database** to manage users, transactions, and budgets efficiently.

---

## 📦 Dependencies Overview

### 1️⃣ **Main Dependencies** (Production)
| Package | Purpose |
|---------|---------|
| **express** | Web framework for building the REST API |
| **mysql2** | MySQL database driver for Node.js |
| **dotenv** | Loads environment variables from a `.env` file |
| **cors** | Enables Cross-Origin Resource Sharing (CORS) |
| **jsonwebtoken** | Handles authentication using JWT tokens |
| **bcryptjs** | Hashes and secures user passwords |
| **express-validator** | Validates and sanitizes request inputs |

### 2️⃣ **Dev Dependencies** (Development)
| Package | Purpose |
|---------|---------|
| **typescript** | Enables TypeScript support |
| **ts-node** | Runs TypeScript files without needing to compile manually |
| **nodemon** | Automatically restarts the server on file changes |
| **@types/express** | TypeScript definitions for Express.js |
| **@types/node** | TypeScript definitions for Node.js APIs |
| **@types/jsonwebtoken** | TypeScript definitions for JWT |
| **@types/bcryptjs** | TypeScript definitions for bcryptjs |
| **@types/cors** | TypeScript definitions for CORS |
| **@types/express-validator** | TypeScript definitions for express-validator |

---

## 🔧 **Project Setup & Installation**

1️⃣ Clone the repository:
```sh
git clone https://github.com/yourusername/finance-tracker-backend.git
cd finance-tracker-backend
```

2️⃣ Install dependencies:
```sh
npm install
```

3️⃣ Create a `.env` file and add your environment variables:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=finance_tracker
JWT_SECRET=your_jwt_secret
```

4️⃣ Start the development server:
```sh
npm run dev
```

---

## 📂 **Project Folder Structure**
```
finance-tracker-backend/
│── src/                     # Main source folder
│   ├── config/              # Configuration files (DB, env)
│   ├── controllers/         # Handles API logic
│   ├── middleware/          # Express middleware (Auth, error handling)
│   ├── models/              # Database models (User, Transactions, Budgets)
│   ├── routes/              # API routes
│   ├── services/            # Business logic services
│   ├── utils/               # Utility functions
│   ├── index.ts             # Main entry file
│── .env                     # Environment variables
│── nodemon.json             # Nodemon configuration
│── package.json             # Dependencies and scripts
│── tsconfig.json            # TypeScript configuration
```

---

## 🚀 **API Endpoints**

### 🔑 **Authentication**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Log in and receive a JWT token

### 💰 **Transactions**
- `POST /api/transactions` → Create a new transaction
- `GET /api/transactions` → Get all transactions

### 📊 **Budgets**
- `POST /api/budgets` → Create a new budget
- `GET /api/budgets` → Retrieve user budgets

---

## 📜 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙌 **Contributing**
Feel free to submit issues and pull requests to improve this project!

---

