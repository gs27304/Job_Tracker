# 💼 Job Tracker — Full-Stack Application Tracking System

[![React](https://img.shields.io/badge/React-18.3-blue.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_4.21-339933.svg?style=flat&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.0-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-SDK_2.10-3448C5.svg?style=flat&logo=cloudinary)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Job Tracker** is a sleek, modern, full-stack monorepo application designed to help software engineers and candidates track, organize, and analyze their job applications in real-time. Built with high performance, security, and exceptional user experience in mind, it provides interactive data visualizations, Cloudinary resume uploads, JWT authentication, and a pre-seeded guest demo mode.

---

## 📌 Table of Contents
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Architecture](#-project-architecture)
- [⚙️ Environment Configuration](#️-environment-configuration)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [📡 API Documentation](#-api-documentation)
- [🔒 Security & Production Best Practices](#-security--production-best-practices)
- [📄 License](#-license)

---

## ✨ Key Features

- **📊 Interactive Analytics Dashboard**:
  - Live metric cards detailing total applications, applied count, interviews, offers, rejections, and wishlist items.
  - Visual charts powered by **Recharts** for status distribution and tracking trends.

- **💼 End-to-End Application Tracking**:
  - Comprehensive CRUD operations to add, view, edit, and delete job applications.
  - Lifecycle statuses: `Wishlist`, `Applied`, `Interview`, `Offer`, and `Rejected`.
  - Rich notes field, application date picker, and automated company logo integration.

- **📄 Cloud Resume Attachment & Management**:
  - Seamless PDF/document resume uploads powered by **Multer** and **Cloudinary**.
  - Direct viewing, downloading, and cloud file deletion capabilities per application.

- **🔑 Secure Authentication & Guest Mode**:
  - User registration & login with **JSON Web Tokens (JWT)** and HTTP-only cookie support.
  - **One-Click Recruiter/Guest Demo Account** (`interviewer@demo.com`) with pre-populated demo applications and write-protection guards (`restrictGuest` middleware).

- **🔍 Advanced Filtering & Pagination**:
  - Debounced text search (by company or role name).
  - Status filtering and dynamic pagination.

- **🎨 Premium UI/UX & Dark Mode**:
  - Native **Light / Dark Mode** theme toggle.
  - Animated toast notifications (`react-toastify`), custom skeleton loading states, and fallback error boundaries.

---

## 🛠️ Tech Stack

### **Frontend (`client/`)**
- **Core**: React 18, Vite 5
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **State & Routing**: React Router v6, React Context API
- **Form & Validation**: React Hook Form
- **Data Visualization**: Recharts
- **HTTP Client**: Axios (with custom request/response interceptors)
- **UI Components**: React Toastify, custom modal and skeleton loaders

### **Backend (`server/`)**
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database & ORM**: MongoDB with Mongoose
- **Cloud Storage**: Cloudinary SDK, Multer & Streamifier
- **Security & Middleware**:
  - `helmet` (Security HTTP Headers)
  - `express-rate-limit` (API Rate Limiting)
  - `express-mongo-sanitize` (NoSQL Injection Protection)
  - `xss-clean` (Sanitizing user input against XSS)
  - `cors`, `cookie-parser`, `express-validator`

### **Monorepo Tooling**
- **Package Manager**: npm Workspaces
- **Process Orchestration**: Concurrently, Nodemon

---

## 📂 Project Architecture

```
Job_Tracker/
├── package.json               # Monorepo root package & script orchestrator
├── .env.example               # Root environment variables blueprint
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── app/               # Main Application Component
│   │   ├── components/        # Reusable UI components (JobCard, ChartCard, ResumeUploader, etc.)
│   │   ├── context/           # React Context (AuthContext, ThemeContext)
│   │   ├── hooks/             # Custom React Hooks
│   │   ├── layouts/           # Layout wrappers & Navbars
│   │   ├── pages/             # Page Views (Dashboard, HomePage, JobDetailPage, Login, Register)
│   │   ├── services/          # API services & Axios configuration
│   │   ├── styles/            # Global CSS & Tailwind imports
│   │   └── utils/             # Helper utilities & formatters
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
└── server/                    # Express.js REST API Backend
    ├── src/
    │   ├── config/            # DB, Cloudinary & Env configs
    │   ├── controllers/       # Route logic (authController, jobController, uploadController)
    │   ├── middlewares/       # Security, Auth, Upload & Error handling middlewares
    │   ├── models/            # Mongoose Schemas (User, Job)
    │   ├── routes/            # Express Routers (authRoutes, jobRoutes)
    │   ├── scripts/           # DB Seeding scripts (seedGuest.js)
    │   ├── utils/             # Express-validator schemas & async handlers
    │   ├── app.js             # Express app setup & middleware stack
    │   └── server.js          # HTTP Server listener & DB connection
    └── package.json
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory (or respective `client` and `server` folders):

### **Root / Server Environment Variables (`server/.env`)**

```env
# Server Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobtracker

# Authentication
JWT_SECRET=your_super_secret_jwt_key_123

# Cloudinary Storage Configuration (Optional - Required for Resume Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Demo / Guest Account (Optional - Defaults provided in seed script)
GUEST_EMAIL=interviewer@demo.com
GUEST_PASSWORD=InterviewerDemo2026!
```

### **Client Environment Variables (`client/.env`)**

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Quick Start & Local Setup

### **Prerequisites**
- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0`
- **MongoDB** (Local instance or MongoDB Atlas URI)

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/Job_Tracker.git
cd Job_Tracker
```

### **2. Install Dependencies**
Install all dependencies across root, client, and server in one command using npm workspaces:
```bash
npm install
```

### **3. Configure Environment Variables**
Copy `.env.example` to `server/.env` and `client/.env`:
```bash
cp .env.example server/.env
```

### **4. Seed Demo Data (Optional but Recommended)**
Seed the database with sample job applications for the guest demo account:
```bash
npm run seed:guest --workspace server
```

### **5. Run Development Server**
Launch both backend and frontend concurrently with a single command:
```bash
npm run dev
```

- **Frontend**: Accessible at `http://localhost:5173`
- **Backend API**: Accessible at `http://localhost:5000/api`

---

## 📡 API Documentation

### **Auth Routes (`/api/auth`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Authenticate user & get token |
| `POST` | `/api/auth/guest-login` | Public | One-click guest session login |
| `POST` | `/api/auth/logout` | Private | Clear authentication session |
| `GET` | `/api/auth/me` | Private | Retrieve current user profile |

### **Job Application Routes (`/api/jobs`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Private | List all jobs (Supports `search`, `status`, `page`, `limit`) |
| `GET` | `/api/jobs/:id` | Private | Get single job details |
| `POST` | `/api/jobs` | Private | Create a new job application |
| `PUT` | `/api/jobs/:id` | Private | Update job details & status |
| `DELETE` | `/api/jobs/:id` | Private* | Delete job application (*Restricted for Guest) |
| `POST` | `/api/jobs/:jobId/resume` | Private | Upload resume attachment (PDF/Doc) |
| `DELETE` | `/api/jobs/:jobId/resume` | Private* | Delete resume attachment (*Restricted for Guest) |

### **System Health (`/api/health`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Returns service health & node environment status |

---

## 🔒 Security & Production Best Practices

- **Strict Input Validation**: Sanitize & validate request payloads using `express-validator`.
- **Injection & XSS Defense**: Sanitizes MongoDB query selectors (`express-mongo-sanitize`) and HTML input strings (`xss-clean`).
- **HTTP Header Protection**: Configured `helmet` headers for protection against Clickjacking, MIME-sniffing, and Cross-Site Scripting.
- **Rate Limiting**: Protected against Brute-Force attacks (200 requests per 15-minute window).
- **Guest Access Guard**: Protects demo users from deleting or overwriting shared guest demo records via the `restrictGuest` middleware.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p center="align">
  Crafted with ❤️ for Job Seekers & Developers everywhere.
</p>
