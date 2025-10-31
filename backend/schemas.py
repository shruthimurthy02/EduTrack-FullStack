"""
Pydantic schemas for request/response validation.
"""

from typing import Optional
from datetime import date
from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    """Base schema for Task with common fields."""

    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    role: str = Field(..., pattern="^(student|teacher)$")
    category: str = Field(..., pattern="^(lesson_plan|assignment|learning_task)$")
    completed: bool = False
    due_date: Optional[date] = None  # ✅ Changed from str → date
    status: str = Field(default="pending", pattern="^(pending|completed|submitted)$")


class TaskCreate(TaskBase):
    """Schema for creating a new task."""
    pass


class TaskUpdate(BaseModel):
    """Schema for updating an existing task."""

    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    role: Optional[str] = Field(None, pattern="^(student|teacher)$")
    category: Optional[str] = Field(None, pattern="^(lesson_plan|assignment|learning_task)$")
    completed: Optional[bool] = None
    due_date: Optional[date] = None  # ✅ Also changed here
    status: Optional[str] = Field(None, pattern="^(pending|completed|submitted)$")


class TaskResponse(TaskBase):
    """Schema for task response with ID."""

    id: int

    class Config:
        """Pydantic configuration."""
        from_attributes = True


