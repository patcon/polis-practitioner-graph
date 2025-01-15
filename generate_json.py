import pandas as pd
import json

# Load CSV file
def csv_to_json(csv_path, output_path):
    df = pd.read_csv(csv_path)

    # Prepare nodes
    nodes = [
        {"id": row["name"], "type": row["type"]}
        for _, row in df.iterrows()
    ]

    # Prepare edges (affiliations)
    edges = []
    for _, row in df.iterrows():
        if pd.notna(row["affiliations"]) and row["affiliations"] != "---":
            affiliations = [aff.strip() for aff in row["affiliations"].split(",")]
            for aff in affiliations:
                edges.append({"source": row["name"], "target": aff})

    # Combine into a JSON structure
    graph_data = {"nodes": nodes, "links": edges}

    # Save to JSON file
    with open(output_path, "w") as f:
        json.dump(graph_data, f, indent=2)

# Example usage
csv_path = "polis-practitioners.csv"
output_path = "graph_data.json"
csv_to_json(csv_path, output_path)
