"""
API routes for task management.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=List[schemas.TaskResponse])
def list_tasks(
    role: Optional[str] = Query(None, pattern="^(student|teacher)$"),
    category: Optional[str] = Query(
        None, pattern="^(lesson_plan|assignment|learning_task)$"
    ),
    completed: Optional[bool] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """
    Retrieve a list of tasks with optional filters.

    Query Parameters:
        role: Filter by role (student or teacher)
        category: Filter by category (lesson_plan, assignment, learning_task)
        completed: Filter by completion status
        skip: Number of records to skip (default: 0)
        limit: Maximum number of records to return (default: 100, max: 100)
    """
    tasks = crud.get_tasks(
        db=db, role=role, category=category, completed=completed, skip=skip, limit=limit
    )
    return tasks


@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific task by ID.

    Args:
        task_id: ID of the task to retrieve

    Raises:
        HTTPException: If task not found
    """
    task = crud.get_task(db=db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("", response_model=schemas.TaskResponse, status_code=201)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task.

    Args:
        task: Task data to create

    Returns:
        Created task object
    """
    return crud.create_task(db=db, task=task)


@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)
):
    """
    Update an existing task.

    Args:
        task_id: ID of the task to update
        task_update: Task data to update

    Returns:
        Updated task object

    Raises:
        HTTPException: If task not found
    """
    updated_task = crud.update_task(db=db, task_id=task_id, task_update=task_update)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task by ID.

    Args:
        task_id: ID of the task to delete

    Raises:
        HTTPException: If task not found
    """
    success = crud.delete_task(db=db, task_id=task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return None
