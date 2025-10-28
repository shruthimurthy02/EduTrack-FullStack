# 🎓 EduTrack – Smart Learning Task Manager

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?style=for-the-badge&logo=react" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge&logo=fastapi" alt="FastAPI Badge"/>
  <img src="https://img.shields.io/badge/Database-SQLite-blueviolet?style=for-the-badge&logo=sqlite" alt="SQLite Badge"/>
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss" alt="Tailwind Badge"/>
  <img src="https://img.shields.io/badge/Code%20Quality-Black%20%26%20Prettier-yellow?style=for-the-badge&logo=codefactor" alt="Code Quality Badge"/>
</p>

---

## 🚀 Overview

**EduTrack** is a full-stack productivity and learning management app designed for the **i2Global** ecosystem.  
It combines task management, teacher planning, and analytics visualization into one modern platform — built with **React + FastAPI**.

---

## 🧩 Features

- 🎯 **Student Task Tracker** – Add, edit, delete, and mark tasks as complete  
- 🧑‍🏫 **Teacher Planner** – Manage lessons and assignment schedules  
- 📚 **Assignment Tracker** – Track student work progress  
- 📊 **Analytics Dashboard** – View insights with charts  
- ⚡ **RESTful API** – Smooth front–back communication using Axios  
- 🧠 **Clean Architecture** – Modular backend and reusable frontend components  
- 🧰 **Auto-Formatting** – Code formatted with Black (Python) and Prettier (JS)

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend** | FastAPI, SQLAlchemy |
| **Database** | SQLite (for demo/testing) |
| **Tools** | Cursor, VS Code, Prettier, Black |

---

## 🗂️ Folder Structure

EduTrack-FullStack/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── models.py
│ │ ├── routes/
│ │ ├── schemas.py
│ │ └── database.py
│ └── requirements.txt
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ └── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 🧩 Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
➡ Runs on: http://127.0.0.1:8000
➡ Swagger Docs: /docs
➡ ReDoc: /redoc

⚛️ Frontend (React)
bash
Copy code
cd frontend
npm install
npm run dev
➡ Runs on: http://localhost:5173

🧾 API Endpoints
Method	Endpoint	Description
GET	/tasks	Fetch all tasks
POST	/tasks	Create a new task
PUT	/tasks/{id}	Update a specific task
DELETE	/tasks/{id}	Delete a task

💅 Code Quality
✅ Python formatted with Black
✅ JavaScript formatted with Prettier
✅ Modular folder structure
✅ Fully CORS-enabled API
✅ No console or linter errors

🧭 Development Tools Used
Tool	Purpose
🧠 Cursor	AI-assisted scaffolding for backend/frontend
💻 VS Code	Final testing, debugging, and formatting
🎨 TailwindCSS	Responsive and modern UI styling
📊 Swagger UI	API testing and documentation

📸 Screenshots
Add images under frontend/public/screenshots/ and reference them here.

🏠 Dashboard Overview

👩‍💻 Author
Shruthi M
Full-Stack Developer Candidate – Technical Assessment (i2Global)
