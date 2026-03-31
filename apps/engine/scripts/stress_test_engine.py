import requests
import concurrent.futures
import time
import random
import json

ENGINE_URL = "http://localhost:8000"

def generate_large_payload(rows=1000):
    """Generate a large dataset for bias analysis"""
    data = []
    groups = ["Group A", "Group B", "Group C", "Group D"]
    for _ in range(rows):
        data.append({
            "race": random.choice(groups),
            "gender": random.choice(["M", "F"]),
            "hired": random.choice([0, 1]),
            "actual": random.choice([0, 1]),
            "predicted": random.choice([0, 1])
        })
    return data

def test_disparate_impact():
    payload = {
        "protected_attribute": "race",
        "outcome_variable": "hired",
        "data": generate_large_payload(2000)
    }
    start = time.time()
    try:
        response = requests.post(f"{ENGINE_URL}/api/v1/analyze", json=payload, timeout=10)
        return response.status_code, time.time() - start
    except Exception as e:
        return str(e), time.time() - start

def test_empathy():
    payload = {
        "text": "We regret to inform you that your application was unsuccessful due to multiple factors. Please do not contact us.",
        "context": "rejection"
    }
    start = time.time()
    try:
        response = requests.post(f"{ENGINE_URL}/api/v1/analyze/empathy", json=payload, timeout=5)
        return response.status_code, time.time() - start
    except Exception as e:
        return str(e), time.time() - start

def run_stress_test(concurrent_requests=50):
    print(f"🚀 Launching Stress Test: {concurrent_requests} concurrent requests...")
    
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = []
        for i in range(concurrent_requests):
            if i % 2 == 0:
                futures.append(executor.submit(test_disparate_impact))
            else:
                futures.append(executor.submit(test_empathy))
        
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    success_count = sum(1 for status, duration in results if status == 200)
    avg_duration = sum(duration for status, duration in results) / len(results)
    
    print("\n--- STRESS TEST RESULTS ---")
    print(f"Total Requests: {len(results)}")
    print(f"Success Rate:   {success_count / len(results) * 100:.1f}%")
    print(f"Avg Latency:    {avg_duration:.3f}s")
    print(f"Total Time:     {sum(duration for status, duration in results):.2f}s")
    print("---------------------------\n")

if __name__ == "__main__":
    run_stress_test(100)