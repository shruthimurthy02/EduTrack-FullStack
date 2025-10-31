"""
CRUD operations for tasks.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from app import models, schemas


def get_task(db: Session, task_id: int) -> Optional[models.Task]:
    """
    Retrieve a task by ID.

    Args:
        db: Database session
        task_id: Task ID to retrieve

    Returns:
        Task object if found, None otherwise
    """
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def get_tasks(
    db: Session,
    role: Optional[str] = None,
    category: Optional[str] = None,
    completed: Optional[bool] = None,
    skip: int = 0,
    limit: int = 100,
) -> List[models.Task]:
    """
    Retrieve a list of tasks with optional filters.

    Args:
        db: Database session
        role: Filter by role (student or teacher)
        category: Filter by category
        completed: Filter by completion status
        skip: Number of records to skip (for pagination)
        limit: Maximum number of records to return

    Returns:
        List of Task objects
    """
    query = db.query(models.Task)

    # Apply filters if provided
    if role is not None:
        query = query.filter(models.Task.role == role)
    if category is not None:
        query = query.filter(models.Task.category == category)
    if completed is not None:
        query = query.filter(models.Task.completed == completed)

    return query.offset(skip).limit(limit).all()


def create_task(db: Session, task: schemas.TaskCreate) -> models.Task:
    """
    Create a new task.

    Args:
        db: Database session
        task: Task data to create

    Returns:
        Created Task object
    """
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(
    db: Session, task_id: int, task_update: schemas.TaskUpdate
) -> Optional[models.Task]:
    """
    Update an existing task.

    Args:
        db: Database session
        task_id: ID of the task to update
        task_update: Task data to update

    Returns:
        Updated Task object if found, None otherwise
    """
    db_task = get_task(db, task_id)
    if not db_task:
        return None

    # Update only provided fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int) -> bool:
    """
    Delete a task by ID.

    Args:
        db: Database session
        task_id: ID of the task to delete

    Returns:
        True if task was deleted, False otherwise
    """
    db_task = get_task(db, task_id)
    if not db_task:
        return False

    db.delete(db_task)
    db.commit()
    return True


