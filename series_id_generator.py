"""
TASK 2 – SERIES ID GENERATOR
Creates sequential IDs like H-20250001 and stores the counter locally.
"""

import json, os

def generate_series_id(counter_file="output/id_counter.json"):
    if os.path.exists(counter_file):
        with open(counter_file) as f:
            data = json.load(f); count = data.get("counter", 0)
    else: count = 0
    count += 1
    with open(counter_file,"w") as f: json.dump({"counter": count}, f)
    sid = f"H-2025{count:04d}"
    print(f"Generated Series ID → {sid}")
    return sid

if __name__ == "__main__":
    generate_series_id()

