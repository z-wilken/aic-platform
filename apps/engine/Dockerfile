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
USER aicuser

# Copy installed packages from builder
COPY --from=builder /root/.local /home/aicuser/.local
COPY . .

ENV PATH=/home/aicuser/.local/bin:$PATH

# Run FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]