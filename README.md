Employee Management System App

A full-stack Employee Management System (EMS) designed to manage employees, departments, roles, salaries, authentication, and reporting.
Built with React (Vite + TailwindCSS) on the frontend and Node.js + Express + Sequelize + MySQL on the backend.
This project demonstrates real-world application architecture, clean separation of concerns, authentication, authorization, and report generation


 Features
 Authentication & Authorization
User registration and login
Password hashing with bcrypt
JWT-based authentication
Role-based access control (Admin, HR, etc.)
Google OAuth (Passport.js)


 Employee Management

Create, update, view, and delete employees

Assign departments and roles

Manage employee salaries



 Department & Role Management

Create and manage departments

Assign roles to employees

Department-wise employee reports



 Reports & Analytics

Employee summary reports

Department-based reports

Salary reports



 Frontend
Responsive UI with TailwindCSS

React Context API for global state

Axios-based API communication

Protected routes


Tech Stack

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


## Project Structure
```text
Employee_Managment_System_App/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── validators/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Departments/
│   │   │   ├── Employees/
│   │   │   ├── Layout/
│   │   │   └── Reports/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md



 Installation & Setup
1️ Clone the Repository
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

 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173

 Authentication Flow
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

API Endpoints (Backend)
Base URL:
http://localhost:5000/api

 Authentication
Method	Endpoint	Description	Access
POST	/auth/register	Register a new user	Public
POST	/auth/login	Login user & return JWT	Public
POST	/auth/logout	Logout user	Authenticated
GET	/auth/me	Get logged-in user profile	Authenticated
GET	/auth/google	Google OAuth login	Public

 Employees
Method	Endpoint	Description	Access
GET	/employees	Get all employees	Admin / HR
GET	/employees/:id	Get employee by ID	Admin / HR
POST	/employees	Create new employee	Admin
PUT	/employees/:id	Update employee details	Admin
DELETE	/employees/:id	Delete employee	Admin

 Departments
Method	Endpoint	Description	Access
GET	/departments	Get all departments	Authenticated
POST	/departments	Create department	Admin
PUT	/departments/:id	Update department	Admin
DELETE	/departments/:id	Delete department	Admin

Roles
Method	Endpoint	Description	Access
GET	/roles	Get all roles	Admin
POST	/roles	Create role	Admin
PUT	/roles/:id	Update role	Admin
DELETE	/roles/:id	Delete role	Admin

Salaries
Method	Endpoint	Description	Access
GET	/salaries	Get salary records	Admin / HR
POST	/salaries	Assign salary to employee	Admin
PUT	/salaries/:id	Update salary	Admin

Reports
Method	Endpoint	Description	Access
GET	/reports/employees	Employee summary report	Admin / HR
GET	/reports/departments	Department-wise report	Admin / HR
GET	/reports/salaries	Salary report	Admin

Security & Middleware
JWT authentication middleware protects private routes
Role-based authorization (Admin, HR)
Input validation using express-validator
Password hashing with bcrypt

Architecture Highlights
RESTful API design
Clean separation of concerns
Scalable folder structure
Production-ready authentication flow

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
james.afful47@gmail.com
