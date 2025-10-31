# EduTrack Backend API

A FastAPI-based backend service for managing educational tasks for students and teachers.

## 📋 Features

- **CRUD Operations**: Full Create, Read, Update, Delete functionality for tasks
- **Role-based Tasks**: Support for both student and teacher tasks
- **Task Categories**: Organize tasks by type (lesson plans, assignments, learning tasks)
- **Task Completion Tracking**: Track completion status of tasks
- **Filtering**: Filter tasks by role, category, and completion status
- **Type Safety**: Comprehensive type hints and Pydantic validation
- **SQLite Database**: Lightweight database with SQLAlchemy ORM

## 🏗️ Project Structure

```
backend/
  app/
    __init__.py           # Package initialization
    main.py               # FastAPI app and routes configuration
    database.py           # Database configuration and session management
    models.py             # SQLAlchemy models
    schemas.py            # Pydantic schemas for validation
    crud.py               # CRUD operations
    routes/
      __init__.py        # Routes package initialization
      tasks.py           # Task API endpoints
  requirements.txt        # Python dependencies
  README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

**Start the development server:**
```bash
uvicorn app.main:app --reload
```

The API will be available at: `http://127.0.0.1:8000`

### Alternative: Run with Python module

```bash
python -m uvicorn app.main:app --reload
```

## 📡 API Endpoints

### Base Endpoints

- **GET `/`** - Welcome message
  - Response: `{"message": "EduTrack API running!"}`

- **GET `/health`** - Health check
  - Response: `{"status": "healthy", "api": "EduTrack API"}`

### Task Endpoints

- **GET `/tasks`** - List all tasks (with optional filters)
  - Query Parameters:
    - `role` (optional): Filter by role ("student" or "teacher")
    - `category` (optional): Filter by category ("lesson_plan", "assignment", "learning_task")
    - `completed` (optional): Filter by completion status (true/false)
    - `skip` (optional): Pagination offset (default: 0)
    - `limit` (optional): Maximum results (default: 100, max: 100)
  - Example: `GET /tasks?role=student&category=assignment`

- **GET `/tasks/{task_id}`** - Get a specific task by ID

- **POST `/tasks`** - Create a new task
  - Body (JSON):
    ```json
    {
      "title": "Complete math assignment",
      "description": "Finish exercises 1-10",
      "role": "student",
      "category": "assignment",
      "completed": false
    }
    ```

- **PUT `/tasks/{task_id}`** - Update an existing task
  - Body (JSON): All fields optional
    ```json
    {
      "title": "Updated title",
      "completed": true
    }
    ```

- **DELETE `/tasks/{task_id}`** - Delete a task

## 📝 Task Model

Each task contains the following fields:

- **id** (int): Unique identifier (auto-generated)
- **title** (str): Task title (required, max 200 characters)
- **description** (str): Task description (optional)
- **role** (str): User role - "student" or "teacher" (required)
- **category** (str): Task category - "lesson_plan", "assignment", or "learning_task" (required)
- **completed** (bool): Completion status (default: false)

## 🧪 Example API Usage

### Create a task
```bash
curl -X POST "http://127.0.0.1:8000/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete homework",
    "description": "Pages 45-50",
    "role": "student",
    "category": "assignment",
    "completed": false
  }'
```

### List tasks
```bash
curl "http://127.0.0.1:8000/tasks"
```

### Update a task
```bash
curl -X PUT "http://127.0.0.1:8000/tasks/1" \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a task
```bash
curl -X DELETE "http://127.0.0.1:8000/tasks/1"
```

## 📚 Interactive API Documentation

Once the server is running, visit:

- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

These provide interactive documentation where you can test the API endpoints directly.

## 🗄️ Database

The application uses SQLite with SQLAlchemy ORM. The database file (`edutrack.db`) is automatically created in the project root when you first run the application.

### Database Initialization

The database and tables are automatically created when you first start the application. No manual setup is required.

## 🔧 Development

### Code Structure

- **Modular Design**: Separate concerns with dedicated files for models, schemas, CRUD operations, and routes
- **Type Hints**: Full type annotations for better IDE support and error detection
- **Clean Code**: Well-documented code with docstrings
- **Validation**: Pydantic schemas ensure data integrity
- **Dependency Injection**: FastAPI's dependency system for database sessions

## 📦 Dependencies

- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations

## 🐛 Troubleshooting

### Port Already in Use

If port 8000 is already in use, specify a different port:

```bash
uvicorn app.main:app --reload --port 8001
```

### Database Issues

If you encounter database-related errors, delete the `edutrack.db` file and restart the application to recreate the database.

## 📄 License

This project is part of the EduTrack application suite.



