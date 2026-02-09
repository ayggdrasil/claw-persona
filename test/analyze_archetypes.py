
import re
import math

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
    
    with open(file_path, 'r') as f:
        lines = f.readlines()
        
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

def analyze_redundancy(archetypes, threshold=0.98):
    names = list(archetypes.keys())
    redundant_groups = []
    processed = set()
    
    for i in range(len(names)):
        name1 = names[i]
        if name1 in processed:
            continue
            
        group = [name1]
        for j in range(i + 1, len(names)):
            name2 = names[j]
            if name2 in processed:
                continue
                
            sim = cosine_similarity(archetypes[name1]['vector'], archetypes[name2]['vector'])
            if sim >= threshold:
                group.append(name2)
                processed.add(name2)
        
        if len(group) > 1:
            redundant_groups.append(group)
            
    return redundant_groups

def main():
    file_path = "/Users/kang/Desktop/11_MBTI/12_persona(gemini)/persona_docs 3/07_feature_vector_by_archetype.md"
    # file_path = "07_feature_vector_by_archetype.md" # If running from cwd
    
    # Check if file exists
    import os
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    archetypes = parse_markdown_table(file_path)
    print(f"Total Archetypes Found: {len(archetypes)}")
    
    # Threshold 0.98 is extremely similar. 0.95 is very similar.
    threshold = 0.95
    groups = analyze_redundancy(archetypes, threshold)
    
    print(f"\n--- Redundant Groups (Similarity >= {threshold}) ---")
    for group in groups:
        print(f"Group: {', '.join(group)}")
        # Print vector of first item to see what it is
        vec = archetypes[group[0]]['vector']
        print(f"  Class: {archetypes[group[0]]['class']}")
        print(f"  Vector: {vec}")
        
    print(f"\nTotal Groups found: {len(groups)}")
    
    # Suggestion: Keep 1 per group
    reduced_count = len(archetypes) - sum(len(g) - 1 for g in groups)
    print(f"Potential Reduced Count: {reduced_count}")

if __name__ == "__main__":
    main()
