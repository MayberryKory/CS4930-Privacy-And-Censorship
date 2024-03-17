import json

# Open the input file
with open('easyprivacy.txt', 'r') as file:
    # Read the content and remove whitespace
    content = file.read().strip()

# Split the content into an array using whitespace as delimiter
data_array = content.split()

# Export the array to a JSON file
with open('easyprivacy.json', 'w') as file:
    json.dump(data_array, file)
