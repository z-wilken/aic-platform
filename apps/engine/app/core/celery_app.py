from celery import Celery
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "aic_engine",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=["app.tasks.explainability"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300,  # 5 minutes max for SHAP/LIME
    worker_max_memory_per_child=1024000,  # 1GB limit per worker child process
    worker_max_tasks_per_child=100,      # Restart worker after 100 tasks to prevent leaks
)
