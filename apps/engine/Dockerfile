FROM python:3.12-alpine AS builder

WORKDIR /app

# Install build dependencies for numpy, pandas, scipy, shap
RUN apk add --no-cache \
    gcc \
    musl-dev \
    python3-dev \
    g++ \
    openblas-dev \
    cmake \
    make

COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.12-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache libstdc++ openblas

# Create non-root user
RUN adduser -D aicuser

# Copy installed packages from builder and app code (as root, then chown)
COPY --from=builder /root/.local /home/aicuser/.local
COPY --chown=aicuser:aicuser . .

ENV PATH=/home/aicuser/.local/bin:$PATH

# Switch to non-root user after all file operations
USER aicuser

# Run FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
