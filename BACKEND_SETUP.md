# Backend Setup Instructions

## ✅ Fixed Structure

The backend has been restructured to work with the command:
```bash
uvicorn backend.main:app --reload
```

## 📁 New Structure

```
EduTrack-FullStack/
├── backend/
│   ├── __init__.py
│   ├── main.py            ← FastAPI app
│   ├── database.py        ← Database config
│   ├── models.py          ← SQLAlchemy models
│   ├── schemas.py         ← Pydantic schemas
│   ├── crud.py            ← CRUD operations
│   ├── routes/
│   │   ├── __init__.py
│   │   └── tasks.py       ← Task routes
│   ├── requirements.txt
│   └── README.md
└── frontend/
```

## 🚀 How to Start

### Step 1: Install Dependencies

```bash
# From project root (EduTrack-FullStack/)
pip install -r backend/requirements.txt
```

### Step 2: Start the Server

From the **project root** (EduTrack-FullStack/):

```bash
uvicorn backend.main:app --reload
```

**Alternative** (from backend directory):
```bash
cd backend
uvicorn main:app --reload
```

### Step 3: Verify

Open your browser to:
- **API**: http://127.0.0.1:8000
- **Docs**: http://127.0.0.1:8000/docs
- **Health**: http://127.0.0.1:8000/health

## 📝 What Changed

### Imports Fixed

All imports updated from `app.*` to `backend.*`:

**Before:**
```python
from app.database import engine, Base
from app.routes import tasks
```

**After:**
```python
from backend.database import engine, Base
from backend.routes import tasks
```

### Files Moved

- ✅ Created `backend/main.py` (updated imports)
- ✅ Created `backend/database.py`
- ✅ Created `backend/models.py` (updated imports)
- ✅ Created `backend/schemas.py`
- ✅ Created `backend/crud.py` (updated imports)
- ✅ Created `backend/routes/` with tasks.py
- ✅ All `__init__.py` files added

## 🔧 Troubleshooting

### "Module not found" errors

Ensure you're running from the correct directory:

**Correct (from root):**
```bash
cd /path/to/EduTrack-FullStack
uvicorn backend.main:app --reload
```

**Also correct (from backend):**
```bash
cd /path/to/EduTrack-FullStack/backend
uvicorn main:app --reload
```

### Database Issues

If you need to reset the database:

```bash
# Delete the database file
rm backend/edutrack.db

# Restart the server - it will create a new database
uvicorn backend.main:app --reload
```

### Old `backend/app/` Folder

The old `backend/app/` folder can be removed:
```bash
rm -rf backend/app
```

## ✨ Features

- ✅ FastAPI backend with proper structure
- ✅ SQLite database with SQLAlchemy
- ✅ CRUD operations for tasks
- ✅ CORS enabled for frontend
- ✅ Due date and status fields
- ✅ RESTful API design
- ✅ Auto-generated documentation

## 🔗 Quick Reference

**Start backend:**
```bash
uvicorn backend.main:app --reload
```

**API Base URL:**
```
http://127.0.0.1:8000
```

**Endpoints:**
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /tasks` - List tasks
- `POST /tasks` - Create task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

## 📞 Next Steps

1. Start backend: `uvicorn backend.main:app --reload`
2. Start frontend: `cd frontend && npm run dev`
3. Access app at: http://localhost:3000

---

✅ **Ready to run!** The backend structure is fixed and all imports are correct.



