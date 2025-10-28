"""
SQLAlchemy database models.
"""

from sqlalchemy import Column, Integer, String, Boolean, Date
from app.database import Base


class Task(Base):
    """
    Task model representing tasks for students and teachers.

    Attributes:
        id: Primary key
        title: Task title
        description: Task description
        role: Role of the user (student or teacher)
        category: Task category (lesson_plan, assignment, learning_task)
        completed: Whether the task is completed (default: False)
        due_date: Due date for the task (optional)
        status: Task status (pending, completed, submitted)
    """

    __tablename__ = "tasks"

    id: int = Column(Integer, primary_key=True, index=True)
    title: str = Column(String, nullable=False)
    description: str = Column(String)
    role: str = Column(String, nullable=False)  # "student" or "teacher"
    category: str = Column(
        String, nullable=False
    )  # "lesson_plan", "assignment", "learning_task"
    completed: bool = Column(Boolean, default=False, nullable=False)
    due_date: str = Column(Date, nullable=True)  # Optional due date
    status: str = Column(
        String, default="pending", nullable=False
    )  # pending, completed, submitted

    def __repr__(self) -> str:
        """String representation of the Task model."""
        return f"<Task(id={self.id}, title='{self.title}', role='{self.role}', completed={self.completed})>"
