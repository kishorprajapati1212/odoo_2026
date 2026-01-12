
# 🧑‍💼 Dayflow – Human Resource Management System (HRMS)

Dayflow HRMS is a full-stack Human Resource Management System designed to digitize and streamline core HR operations such as employee management, attendance tracking, leave handling, and payroll processing.  
The system supports **role-based access** for **Admin/HR** and **Employees** with a clean and scalable architecture.

---

## 📌 Features

### 👤 Employee
- Secure login & authentication
- View personal profile
- Apply for leave
- View attendance records
- View payroll & salary slips

### 🛠️ Admin / HR
- Employee management
- Attendance monitoring
- Leave approval workflow
- Payroll management
- Analytics & reports dashboard

---

## 🗂️ Database Design

The following diagram represents the core database tables and relationships used in the HR Management System:

<p align="center">
  <img src="https://github.com/user-attachments/assets/36d46d08-6590-4553-b690-151acd8d214c" alt="HRMS Database Diagram" width="600"/>
</p>

---

## 🧰 Tech Stack

### Frontend
- React
- Tailwind CSS
- Recharts (Analytics & Reports)
- React Router

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL / MySQL (configurable)

### Tools
- Git & GitHub
- Project IDX / VS Code

---

## 🚀 Installation & Setup

Follow the steps below to run the project locally.

### ✅ Step 1: Extract Project
Unzip the project folder.

---

### ✅ Step 2: Setup Client (Frontend)
```
cd client
npm install
```

### step 3:- server setup
```
cd ../server
npm install
```

## step 4:- set up envirment variables
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key

## step 5:- run the project
```
cd server
nodemon index.js
cd ../client
npm run dev
```
