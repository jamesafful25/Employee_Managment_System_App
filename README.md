Employee Management System App

A full-stack Employee Management System (EMS) designed to manage employees, departments, roles, salaries, authentication, and reporting.
Built with React (Vite + TailwindCSS) on the frontend and Node.js + Express + Sequelize + MySQL on the backend.
This project demonstrates real-world application architecture, clean separation of concerns, authentication, authorization, and report generation


 Features
🔐 Authentication & Authorization

User registration and login

Password hashing with bcrypt

JWT-based authentication

Role-based access control (Admin, HR, etc.)

Google OAuth (Passport.js)

👨‍💼 Employee Management

Create, update, view, and delete employees

Assign departments and roles

Manage employee salaries

🏢 Department & Role Management

Create and manage departments

Assign roles to employees

Department-wise employee reports

📊 Reports & Analytics

Employee summary reports

Department-based reports

Salary reports

🌐 Frontend

Responsive UI with TailwindCSS

React Context API for global state

Axios-based API communication

Protected routes

🛠️ Tech Stack
Frontend

React (Vite)

TailwindCSS

Axios

React Router

Context API

Backend

Node.js

Express.js

Sequelize ORM

MySQL

JWT Authentication

Passport.js

bcrypt

express-validator


Employee_Managment_System_App/
├── backend/
│   ├── controllers/     # Business logic (route handlers)
│   ├── models/          # Sequelize models & relationships
│   ├── routes/          # API route definitions
│   ├── middlewares/     # Auth & authorization middleware
│   ├── validators/     # Request validation rules
│   ├── utils/           # Helper functions (JWT, hashing, etc.)
│   ├── config/          # Database & environment config
│   └── server.js        # Backend entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/      # Images & static assets
│   │   ├── components/
│   │   │   ├── Auth/         # Authentication UI
│   │   │   ├── Dashboard/   # Dashboard components
│   │   │   ├── Departments/ # Department management
│   │   │   ├── Employees/   # Employee management
│   │   │   ├── Layout/      # Navbar, Sidebar, layout components
│   │   │   └── Reports/     # Reporting UI
│   │   ├── context/     # Global state (Auth context)
│   │   ├── services/    # API service layer (Axios)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/jamesafful25/Employee_Managment_System_App.git
cd Employee_Managment_System_App

🔧 Backend Setup
cd backend
npm install

Environment Variables (.env)

Create a .env file in the backend folder:

PORT=5000
DB_NAME=employee_management_system
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_super_secret_key

Run Backend
npm run dev


Backend runs on:

http://localhost:5000

🎨 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Authentication Flow

User logs in

Backend validates credentials

JWT token is generated

Token is stored (cookie or localStorage)

Protected routes require authentication middleware



 API Architecture

Controllers handle business logic

Routes define endpoints

Middlewares protect routes

Validators ensure clean input

Utils handle reusable logic

This follows clean and scalable backend architecture


📈 Why This Project Matters

This project demonstrates:

Real-world full-stack development

Proper folder organization

Secure authentication practices

Scalable frontend architecture

RESTful API design

📄 License

This project is licensed under the ISC License.


👨‍💻 Author

James Afful
Full-Stack Developer
