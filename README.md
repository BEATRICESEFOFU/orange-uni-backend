Orange-Uni Student Portal — Backend API

Name: Godiraone Beatrice Sefofu  
Module: INFS 202  
Project: Backend Project  

 Project Description
A RESTful backend API built with Node.js and Express that powers the Orange-Uni Student Portal. It handles authentication using JWT tokens and manages student records stored in a SQLite database.

Tech Stack
- Node.js — server runtime
- Express — web framework
- SQLite (better-sqlite3) — database
- JWT (jsonwebtoken) — authentication
- bcryptjs — password hashing
- CORS — cross-origin resource sharing
- dotenv — environment variables

API Endpoints

 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new staff account |
| POST | `/api/auth/login` | Login and receive JWT token |

 Students (all protected — requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student by ID |
| POST | `/api/students` | Add a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

 Database Schema

  users table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| username | TEXT | Unique username |
| email | TEXT | Unique email |
| password | TEXT | Bcrypt hashed password |
| role | TEXT | User role (staff/admin) |
| created_at | DATETIME | Timestamp |

 students table
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key (e.g. OU-001) |
| name | TEXT | Full name |
| email | TEXT | Unique email |
| dept | TEXT | Department |
| year | TEXT | Year of study |
| gpa | REAL | Grade point average |
| phone | TEXT | Phone number |
| status | TEXT | active or inactive |
| created_at | DATETIME | Timestamp |

---

Setup Instructions

 Prerequisites
- Node.js installed

Run locally
```bash
git clone https://github.com/BEATRICESEFOFU/orange-uni-backend.git
cd orange-uni-backend
npm install
node server.js
```

Server runs on `http://localhost:5000`

Environment Variables
Create a `.env` file:

 Live URL
Backend API: https://orange-uni-backend.onrender.com  
Frontend: https://orange-uni-project.vercel.app

 Security
- Passwords are hashed using bcryptjs with salt rounds of 10
- All student routes are protected with JWT middleware
- Environment variables used for all secrets
- CORS configured to allow only the frontend origin