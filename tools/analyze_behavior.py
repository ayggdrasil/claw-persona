
import re
import math
import argparse
import sys
import yaml

def cosine_similarity(v1, v2):
    dot_product = sum(a * b for a, b in zip(v1, v2))
    norm_v1 = math.sqrt(sum(a * a for a in v1))
    norm_v2 = math.sqrt(sum(b * b for b in v2))
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
    return dot_product / (norm_v1 * norm_v2)

def parse_markdown_table(file_path):
    archetypes = {}
    current_class = ""
    
    try:
        with open(file_path, 'r') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}", file=sys.stderr)
        return {}
        
    for line in lines:
        # Check for class header
        class_match = re.match(r'^### ([IVX]+)\. (.+) \(Archetypes', line)
        if class_match:
            current_class = class_match.group(2)
            continue
            
        # Check for table row
        # Expected format: | Name | 0.1 | 0.2 | ... |
        if not line.strip().startswith('|'):
            continue
        if 'Archetype' in line or '---' in line:
            continue
            
        parts = [p.strip() for p in line.split('|') if p.strip()]
        if len(parts) >= 13: # Name + 12 features
            name = parts[0]
            try:
                vector = [float(x) for x in parts[1:13]]
                archetypes[name] = {
                    "class": current_class,
                    "vector": vector
                }
            except ValueError:
                continue
                
    return archetypes

def analyze_behavior(task_history=None, window_size=30, archetypes_path=None):
    """
    Analyzes behavior based on task history and returns the closest archetype.
    
    Args:
        task_history: List of task objects (not used in this heuristic version yet, 
                      placeholder for actual features extraction).
        window_size: Number of recent tasks to consider.
        archetypes_path: Path to the archetypes definition file.
    
    Returns:
        dict: The best matching archetype and its score.
    """
    if archetypes_path is None:
        # Default fallback to the YAML file in data/
        # Assumes running from root of skill or tools/
        archetypes_path = "data/archetypes.yaml"
        # minimal fallback logic for relative paths
        if not os.path.exists(archetypes_path):
             archetypes_path = "../data/archetypes.yaml"

    try:
        with open(archetypes_path, 'r') as f:
             archetypes = yaml.safe_load(f)
    except FileNotFoundError:
        return {"error": f"Archetypes file not found at {archetypes_path}"}
    
    if not archetypes:
        return {"error": "No archetypes found"}

    # Placeholder logic: for now, just return a random or specific one
    # since we don't have real task history -> feature vector logic here yet.
    # In a real skill, this would:
    # 1. Extract features from task_history
    # 2. Compare features vs archetypes vectors
    
    # Returning the first one for demonstration of the interface
    first_key = list(archetypes.keys())[0]
    return {
        "archetype": first_key,
        "class": archetypes[first_key].get("class", "Unknown"),
        "consistency_score": 0.95,
        "suggested_traits": ["Analytical", "Reserved"] # Placeholder
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze Agent Behavior")
    parser.add_argument("--window", type=int, default=30, help="Window size")
    parser.add_argument("--file", type=str, default="../data/archetypes.yaml", help="Path to archetypes YAML file")
    
    args = parser.parse_args()
    # Ensure os is imported for the path check above if not already
    import os
    result = analyze_behavior(window_size=args.window, archetypes_path=args.file)
    print(yaml.dump(result))
