# MERN Employee Management System (Capstone Project)

> **Information & Communication Technology Academy of Kerala (ICTAK)**  
> **Course:** Full Stack Application Development with ReactJS  
> **Project:** Capstone Project - Employee Management System  
> **Developer:** Aadith Krishna  
> **Institution:** Sahrdaya College of Engineering & Technology, Kodakara  
> **Live Hosted Application:** [https://mern-employee-management-system-z1t5.onrender.com](https://mern-employee-management-system-z1t5.onrender.com)  

---

## 🌟 Executive Summary
The **Employee Management System** is a full-stack web application built on the **MERN** stack (MongoDB, Express.js, React.js, and Node.js). It provides an automated, centralized platform for HR professionals and administrators to view, search, register, update, and manage employee records efficiently across an organization.

---

## 🌐 Live URLs
- **Web Application:** [https://mern-employee-management-system-z1t5.onrender.com](https://mern-employee-management-system-z1t5.onrender.com)
- **API Health Check:** [https://mern-employee-management-system-z1t5.onrender.com/api/health](https://mern-employee-management-system-z1t5.onrender.com/api/health)
- **GitHub Repository:** [https://github.com/aadithkrishnaep/MERN-Employee-Management-System](https://github.com/aadithkrishnaep/MERN-Employee-Management-System)

---

## 🏗️ Architecture & Project Structure
Following the official ICTAK Project Guidelines (Section 4):

```
mern-employee-management-system/
├── client/                     # React 18 frontend (Vite + Bootstrap)
│   ├── src/
│   │   ├── components/         # Navigation, Dashboard, EmployeeForm, EditModal
│   │   ├── services/api.js     # Centralized API service layer
│   │   ├── App.jsx             # React Router routing configuration
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Styling
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── server/                     # Node.js + Express REST API
│   ├── src/
│   │   ├── config/db.js        # MongoDB Atlas connection
│   │   ├── controllers/        # Request handling logic
│   │   ├── models/Employee.js  # Mongoose Schema & validation
│   │   ├── routes/             # REST API routing
│   │   ├── middleware/         # Centralized error handling & logging
│   │   └── server.js           # Server bootstrap & static hosting
│   ├── package.json
│   └── .env.example
├── Summer_Internship_Report_MERN_Employee_System.docx  # Official report document
├── .gitignore
├── package.json                # Root package orchestration
└── README.md
```

---

## 🚀 REST API Contract

| Method | Endpoint | Description | Request Body | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/employees` | List all employees | None | `200 OK` |
| **GET** | `/api/employeelist` | Compatibility route for employee list | None | `200 OK` |
| **GET** | `/api/employees/:id` | Fetch single employee by ID | None | `200 OK` |
| **POST** | `/api/employees` | Add new employee | `{ name, designation, location, salary }` | `201 Created` |
| **PUT** | `/api/employees/:id` | Update employee information | `{ name, designation, location, salary }` | `200 OK` |
| **PUT** | `/api/employeelist` | Update employee by body `_id` | `{ _id, name, designation, location, salary }` | `200 OK` |
| **DELETE** | `/api/employees/:id` | Delete employee from database | None | `200 OK` |

---

## 💻 Tech Stack
- **Frontend:** React 18, React-Bootstrap 2, Bootstrap 5, Bootstrap Icons, React Router DOM 6, Vite 6
- **Backend:** Node.js 24, Express 4, Mongoose 8, CORS, Morgan, Dotenv
- **Database:** MongoDB Atlas (Cloud Database)
- **Deployment:** Render (Web Service)

---

## 🛠️ Local Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB Atlas account (or local MongoDB)

### 2. Clone the Repository
```bash
git clone https://github.com/aadithkrishnaep/MERN-Employee-Management-System.git
cd MERN-Employee-Management-System
```

### 3. Install Dependencies
```bash
npm run install-all
```

### 4. Configure Environment Variables
Copy `.env.example` in both `server/` and `client/`:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```
Update `server/.env` with your MongoDB Atlas URI:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 5. Start Development Servers
```bash
npm run dev
```
Open **http://localhost:5173** to use the application!
