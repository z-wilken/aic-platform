import os
from celery import Celery

# Load configuration from environment
REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "aic_engine_tasks",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=["app.tasks.analysis"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300,  # 5 minutes max per audit task
)
