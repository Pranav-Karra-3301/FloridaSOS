import requests
import json
import os
import time
from datetime import datetime, timedelta

def load_api_key():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the full path to the api.json file in the same folder
    api_file_path = os.path.join(script_dir, 'api.json')
    
    # Check if the file exists before trying to open it
    if not os.path.exists(api_file_path):
        raise FileNotFoundError(f"API file not found at {api_file_path}")
    
    with open(api_file_path) as f:
        api_keys = json.load(f)
        return api_keys.get("GOOGLE_MAPS_API")

# Load API key
API_KEY = load_api_key()

# List of towns in Florida
hillsborough_towns = [
    "Apollo Beach", "Balm", "Bloomingdale", "Brandon", "Carrollwood", "Cheval", 
    "Citrus Park", "Dover", "East Lake-Orient Park", "Egypt Lake-Leto", "Fish Hawk", 
    "Gibsonton", "Keystone", "Lake Magdalene", "Lutz", "Mango", "Northdale", 
    "Pebble Creek", "Plant City", "Progress Village", "Riverview", "Ruskin", 
    "Seffner", "Sun City Center", "Tampa", "Temple Terrace", "Thonotosassa", 
    "Town 'n' Country", "University", "Valrico", "Westchase", "Wimauma"
]

# Base URL for Google Places API
base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

# Function to fetch hospitals in a given town
def get_hospitals(town):
    query = f"hospitals in {town}, Florida"  # Specify Florida in the query
    params = {
        'query': query,
        'key': API_KEY
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.json().get('results', [])
    else:
        print(f"Error fetching data for {town} (hospitals): {response.status_code}")
        return []

# Main dictionary to store all hospitals for each town
towns_hospitals = {}

# Fetch hospitals for each town and save the data
for town in hillsborough_towns:
    print(f"Fetching hospitals for {town}...")
    hospitals = get_hospitals(town)
    towns_hospitals[town] = []
    
    for hospital in hospitals:
        name = hospital.get('name')
        address = hospital.get('formatted_address')
        
        # Generate a Google Maps link using only the address
        maps_link = f"https://www.google.com/maps/search/?api=1&query={address.replace(' ', '+')}"

        # Create the hospital info without availability and Google search link
        hospital_info = {
            'name': name,
            'address': address,
            'maps_link': maps_link
        }
        towns_hospitals[town].append(hospital_info)

    # Pause to respect rate limits
    time.sleep(0.2)

# Save the JSON file in the same directory as the script
hospitals_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hospitals_hillsborough.json")
with open(hospitals_file_path, "w") as file:
    json.dump(towns_hospitals, file, indent=4)

print(f"Hospitals data saved to {hospitals_file_path}")