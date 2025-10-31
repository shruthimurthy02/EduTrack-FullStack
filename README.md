# 🎓 EduTrack – Full Stack Task Management System

EduTrack is a modern, school-themed task management platform designed for students and teachers to manage, track, and organize academic tasks efficiently.

---

## 🚀 Features
- ✅ Create, Read, Update, Delete (CRUD) tasks  
- 🎨 Modern responsive UI using **React + Tailwind CSS + Framer Motion**  
- 📘 Role-based task creation (Student / Teacher)  
- 🪄 Smooth animations, transitions, and hover effects  
- 🕐 Task status tracking (Pending, Completed, Submitted)  
- 🌐 Backend powered by **FastAPI**  
- 💾 SQLite database integration  

---

## 🧠 Tech Stack
**Frontend:** React, Tailwind CSS, Framer Motion, Axios, Vite  
**Backend:** FastAPI, SQLAlchemy, Pydantic  
**Database:** SQLite  
**Version Control:** Git & GitHub  

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

➡️ Visit API Docs → http://127.0.0.1:8000/docs

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


➡️ Open the Frontend → http://localhost:5173

🧩 API Endpoints
Method	Endpoint	Description
POST	/tasks	Create new task
GET	/tasks	Get all tasks
PUT	/tasks/{id}	Update task
DELETE	/tasks/{id}	Delete task
🪶 Design Highlights

Soft academic color palette (blue, yellow, white, navy)

i2 Global logo integrated in header

Responsive layout with smooth fade-in animations

Cards with soft shadows & rounded edges

Elegant, school-friendly Poppins typography

Subtle hover transitions & interactive animations using Framer Motion

🧾 Author

Shruthi M
GitHub: https://github.com/shruthimurthy02/EduTrack-FullStack