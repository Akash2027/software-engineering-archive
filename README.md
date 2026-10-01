# 📚 Software Engineering Archive

[![Live Demo](https://img.shields.io/badge/Live_Demo-https://software--engineering--archive.vercel.app-blue?style=for-the-badge&logo=vercel)](https://software-engineering-archive.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend_API-https://software--engineering--archive--backend.onrender.com-green?style=for-the-badge&logo=render)](https://software-engineering-archive-backend.onrender.com/docs)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A production-grade full-stack academic repository platform for Software Engineering students to search, upload, and download question papers and study notes across 85+ courses.

![Project Banner](https://via.placeholder.com/1200x400/6366f1/white?text=Software+Engineering+Archive)

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Problems Solved](#problems-solved)
- [Future Enhancements](#future-enhancements)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Project Overview

**Software Engineering Archive** is a centralized academic repository that allows Software Engineering students to:

- 🔍 **Search** question papers and notes by course code or name
- 📤 **Upload** study materials (PDFs and images)
- 📥 **Download** resources with proper naming conventions
- 📊 **Track** platform statistics in real-time

The platform supports **85+ Software Engineering courses** including Programme Core, Programme Elective, and University Core courses from VIT University.

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Search by course code (SWE2005) or course name (Software Testing) with autocomplete |
| 📄 **Question Papers** | Upload and download PDFs and images with exam type, semester, and slot metadata |
| 📝 **Study Notes** | Upload and download notes with custom titles and metadata |
| 📊 **Real-time Stats** | Live counters for total papers, notes, and courses uploaded |
| 🎨 **Modern UI** | Responsive design with Tailwind CSS, animations, and hover effects |
| ☁️ **Cloud Storage** | All files stored permanently on Cloudinary (25GB free tier) |
| 🗄️ **Persistent Database** | PostgreSQL database ensures data never disappears |

### Course Coverage

- **19 Programme Core courses** (SWE2001, SWE2005, SWE3001, etc.)
- **55+ Programme Elective courses** (AI, ML, Android, Cloud Computing, etc.)
- **15+ University Core courses** (Mathematics, Physics, English, etc.)

### File Support

- ✅ PDF Documents
- ✅ JPEG Images
- ✅ PNG Images
- ✅ GIF Images
- ✅ WEBP Images

---

## 🌐 Live Demo

| Environment | URL |
|-------------|-----|
| **Frontend** | [https://software-engineering-archive.vercel.app](https://software-engineering-archive.vercel.app) |
| **Backend API** | [https://software-engineering-archive-backend.onrender.com](https://software-engineering-archive-backend.onrender.com) |
| **API Documentation** | [https://software-engineering-archive-backend.onrender.com/docs](https://software-engineering-archive-backend.onrender.com/docs) |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI development |
| **Tailwind CSS** | Utility-first responsive styling |
| **React Router DOM** | Client-side routing (6 pages) |
| **Axios** | HTTP client for API integration |
| **React Icons** | Beautiful icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance Python web framework |
| **SQLAlchemy ORM** | Database modeling and queries |
| **PostgreSQL** | Persistent relational database (Render) |
| **SQLite** | Local development database |
| **Cloudinary API** | Cloud file storage (PDFs & images) |
| **Uvicorn** | ASGI server for FastAPI |

### Deployment
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting (free tier) |
| **Render** | Backend API + PostgreSQL hosting (free tier) |
| **Cloudinary** | File storage (25GB free tier) |
| **GitHub** | Version control and CI/CD |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React)                              │
│              https://software-engineering-archive.vercel.app     │
├─────────────────────────────────────────────────────────────────┤
│  • React 18 for UI components                                    │
│  • Tailwind CSS for responsive design                            │
│  • React Router for navigation                                   │
│  • Axios for API calls                                           │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (FastAPI)                             │
│         https://software-engineering-archive-backend.onrender.com│
├─────────────────────────────────────────────────────────────────┤
│  • FastAPI for REST API                                         │
│  • SQLAlchemy ORM for database operations                       │
│  • Cloudinary SDK for file storage                              │
│  • Uvicorn as ASGI server                                       │
└──────────────┬──────────────────────────┬──────────────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────────┐   ┌──────────────────────────────────┐
│   PostgreSQL Database     │   │      Cloudinary Storage          │
│   (Render - Persistent)   │   │      (Free Tier - 25GB)          │
├──────────────────────────┤   ├──────────────────────────────────┤
│ • Papers table (metadata) │   │ • Question Papers (PDF/Images)   │
│ • Notes table (metadata)  │   │ • Study Notes (PDF/Images)       │
│ • 85+ Courses (in code)   │   │ • Permanent file storage         │
└──────────────────────────┘   └──────────────────────────────────┘
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| `GET` | `/api/search?q={query}` | Search courses by code/name | `/api/search?q=SWE2005` |
| `GET` | `/api/courses` | Get all 85+ courses | `/api/courses` |
| `GET` | `/api/papers/{course_code}` | Get papers for a course | `/api/papers/SWE2005` |
| `POST` | `/api/upload-paper` | Upload question paper | Multipart form data |
| `GET` | `/api/notes/{course_code}` | Get notes for a course | `/api/notes/SWE2005` |
| `POST` | `/api/upload-note` | Upload study note | Multipart form data |
| `GET` | `/api/stats` | Platform statistics | `/api/stats` |
| `GET` | `/api/view/{type}/{id}` | View file in browser | `/api/view/paper/{id}` |
| `GET` | `/api/download/{type}/{id}` | Force download file | `/api/download/note/{id}` |
| `GET` | `/health` | Health check | `/health` |

### Sample API Response

**GET `/api/search?q=SWE2005`**
```json
[
  {
    "course_code": "SWE2005",
    "course_name": "Software Testing"
  }
]
```

**GET `/api/stats`**
```json
{
  "totalPapers": 42,
  "totalNotes": 18,
  "totalCourses": 85
}
```

---

## 🗄️ Database Schema

### Papers Table
```sql
CREATE TABLE papers (
    id SERIAL PRIMARY KEY,
    paper_id VARCHAR UNIQUE NOT NULL,
    course_code VARCHAR NOT NULL,
    course_name VARCHAR NOT NULL,
    exam_type VARCHAR NOT NULL,
    semester VARCHAR NOT NULL,
    slot VARCHAR NOT NULL,
    file_url VARCHAR NOT NULL,
    file_name VARCHAR NOT NULL,
    file_type VARCHAR DEFAULT 'PDF',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_papers_course_code ON papers(course_code);
```

### Notes Table
```sql
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    note_id VARCHAR UNIQUE NOT NULL,
    course_code VARCHAR NOT NULL,
    course_name VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    semester VARCHAR NOT NULL,
    slot VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL,
    file_url VARCHAR NOT NULL,
    file_name VARCHAR NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notes_course_code ON notes(course_code);
```

---

## 📁 Project Structure

```
Software-Engineering-Archive/
├── frontend/                          # React Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation bar with active states
│   │   │   ├── Footer.jsx            # Footer with developer info
│   │   │   └── SearchBar.jsx         # Autocomplete search component
│   │   ├── pages/
│   │   │   ├── HomePage.jsx          # Landing page with stats
│   │   │   ├── SearchPapersPage.jsx  # Course selection interface
│   │   │   ├── UploadPapersPage.jsx  # Multi-field upload form
│   │   │   ├── NotesPage.jsx         # Dual tab (search/upload)
│   │   │   └── SubjectDetailsPage.jsx # Course materials viewer
│   │   ├── services/
│   │   │   └── api.js                # Axios API configuration
│   │   ├── App.js                    # Routing setup
│   │   ├── App.css                   # Additional styles
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles + animations
│   ├── package.json                  # Dependencies
│   ├── tailwind.config.js            # Tailwind CSS config
│   ├── postcss.config.js             # PostCSS config
│   └── .env                          # Environment variables
│
├── backend/                           # FastAPI Application
│   ├── main.py                        # 10+ API endpoints
│   ├── database.py                    # SQLAlchemy models
│   ├── requirements.txt               # Python dependencies
│   ├── .env                           # Environment variables
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── search.py                  # Search endpoints
│   │   ├── papers.py                  # Papers endpoints
│   │   ├── notes.py                   # Notes endpoints
│   │   └── stats.py                   # Statistics endpoint
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py                 # Pydantic models
│   └── services/
│       ├── __init__.py
│       ├── course_data.py             # 85+ courses dataset
│       └── cloudinary_service.py      # Cloudinary upload logic
│
├── vercel.json                         # Vercel deployment config
├── .gitignore                          # Git ignore file
├── .python-version                     # Python version for Render
└── README.md                           # Project documentation
```

---

## 💻 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.11 or higher)
- **Git**
- **Cloudinary Account** (free) - [Sign up here](https://cloudinary.com)
- **Render Account** (free) - [Sign up here](https://render.com)
- **Vercel Account** (free) - [Sign up here](https://vercel.com)

---

### Backend Setup

#### 1. Clone the repository
```bash
git clone https://github.com/Akash2027/software-engineering-archive.git
cd software-engineering-archive/backend
```

#### 2. Create and activate virtual environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install dependencies
```bash
pip install -r requirements.txt
```

#### 4. Configure environment variables

Create a `.env` file in the `backend` folder:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### 5. Initialize database

The database will be created automatically when you run the app for the first time.

#### 6. Run the backend server
```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

---

### Frontend Setup

#### 1. Navigate to frontend folder
```bash
cd ../frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

#### 4. Run the frontend development server
```bash
npm start
```

The frontend will be available at: `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | ✅ Yes |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | ✅ Yes |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | ✅ Yes |
| `DATABASE_URL` | PostgreSQL connection string | Only for production |
| `RENDER` | Set to `true` on Render platform | Only for production |

### Frontend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | ✅ Yes |

---

## 🚀 Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Create a new **Web Service** on Render
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
6. Click **"Create Web Service"**

### Deploy PostgreSQL on Render

1. Click **"New +"** → **"PostgreSQL"**
2. Choose **Free** plan
3. Copy the **Internal Connection String**
4. Add `DATABASE_URL` to your backend service environment variables

### Deploy Frontend to Vercel

**Option A: Drag & Drop**
```bash
npm run build
```
Then drag the `build` folder to [Vercel](https://vercel.com/new)

**Option B: GitHub Integration**
Connect your GitHub repository and set:
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`

---

## 🐛 Problems Solved During Development

| Problem | Solution |
|---------|----------|
| PDFs not displaying in browser | Changed Cloudinary `resource_type` from "raw" to "image" |
| Data disappearing after server restart | Switched from SQLite to PostgreSQL |
| CORS errors blocking API calls | Added Vercel domains to backend `allow_origins` |
| React Router 404 on refresh | Added `vercel.json` with rewrite rules |
| Search not working on live site | Hardcoded backend URL directly in frontend components |
| Files uploaded as corrupted Base64 | Switched to direct file stream upload |
| Special characters in slot names causing 404 | Added `clean_filename()` function to replace `+` with `_` |

---

## 🔮 Future Enhancements

| Feature | Priority | Status |
|---------|----------|--------|
| 🔐 User Authentication (JWT) | High | Pending |
| 👥 Admin/Student Roles | High | Pending |
| ⭐ Rating System for Papers | Medium | Pending |
| 📄 Pagination for Results | Medium | Pending |
| 📧 Email Notifications | Low | Pending |
| 🌙 Dark Mode | Low | Pending |
| 🔔 Upload Notifications | Low | Pending |
| 📊 Advanced Analytics | Low | Pending |

---

## 📸 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400/6366f1/white?text=Homepage+with+Stats)

### Search Papers
![Search Papers](https://via.placeholder.com/800x400/6366f1/white?text=Search+Papers+Page)

### Upload Papers
![Upload Papers](https://via.placeholder.com/800x400/6366f1/white?text=Upload+Papers+Form)

### Subject Details
![Subject Details](https://via.placeholder.com/800x400/6366f1/white?text=Subject+Details+Page)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Akash K** - Software Engineering Student

- **GitHub:** [https://github.com/Akash2027](https://github.com/Akash2027)
- **LinkedIn:** [https://www.linkedin.com/in/akash-k-bb9a20274](https://www.linkedin.com/in/akash-k-bb9a20274)
- **Project Link:** [https://software-engineering-archive.vercel.app](https://software-engineering-archive.vercel.app)

---

## 🙏 Acknowledgments

- **VIT University** for the course curriculum
- **Cloudinary** for free tier file storage
- **Render** for free tier hosting and PostgreSQL
- **Vercel** for free tier frontend hosting

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Frontend Files** | 8 components, 5 pages |
| **Backend Files** | 10+ API endpoints |
| **Database Tables** | 2 (Papers, Notes) |
| **Courses Available** | 85+ |
| **File Formats Supported** | 6 (PDF, JPG, JPEG, PNG, GIF, WEBP) |
| **Semester Options** | 24+ |
| **Slot Options** | 45+ |
| **Deployment Time** | ~30 seconds (Vercel) |
| **Build Size** | ~86 KB (gzipped) |

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ for Software Engineering Students**

