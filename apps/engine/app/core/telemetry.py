import time
import psutil
import os
from contextlib import contextmanager
from typing import Dict, Any

# Simple carbon factor for South African grid (approx 0.9kg/kWh)
# 1 ms of CPU roughly uses 0.0000002 kWh on a standard cloud instance
# 0.0000002 kWh * 900g = 0.00018g per ms
CARBON_FACTOR_PER_MS = 0.00018 

@contextmanager
def track_resource_usage():
    """
    Context manager to track compute time, memory usage, and carbon estimate.
    Follows Green Coding Directive S1-01.
    """
    process = psutil.Process(os.getpid())
    start_time = time.time()
    start_mem = process.memory_info().rss
    
    usage = {
        "compute_ms": 0,
        "memory_mb": 0,
        "carbon_estimate_g": 0
    }
    
    yield usage
    
    end_time = time.time()
    end_mem = process.memory_info().rss
    
    compute_ms = int((end_time - start_time) * 1000)
    # Memory peak would be better, but RSS delta is a starting point for per-request metrics
    memory_mb = round(max(0, (end_mem - start_mem)) / (1024 * 1024), 2)
    carbon_g = round(compute_ms * CARBON_FACTOR_PER_MS, 6)
    
    usage["compute_ms"] = compute_ms
    usage["memory_mb"] = memory_mb
    usage["carbon_estimate_g"] = carbon_g
