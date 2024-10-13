import requests
import json
import os
import time

def load_api_key():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the full path to the api.json file
    api_file_path = os.path.join(script_dir, 'api.json')
    
    with open(api_file_path) as f:
        api_keys = json.load(f)
        return api_keys.get("GOOGLE_MAPS_API")

# Load API key
API_KEY = load_api_key()

# List of towns
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

# Function to fetch hotels in a given town
def get_hotels(town):
    query = f"hotels in {town}"
    params = {
        'query': query,
        'key': API_KEY
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.json().get('results', [])
    else:
        print(f"Error fetching data for {town} (hotels): {response.status_code}")
        return []

# Load availability data from availability.json
script_dir = os.path.dirname(os.path.abspath(__file__))
availability_file_path = os.path.join(script_dir, "availability.json")
with open(availability_file_path, "r") as availability_file:
    availability_data = json.load(availability_file)

# Main dictionary to store all hotels with availability for each town
towns_hotels = {}

# Fetch hotels for each town and save the data
for town in hillsborough_towns:
    print(f"Fetching hotels for {town}...")
    hotels = get_hotels(town)
    towns_hotels[town] = []
    
    for hotel in hotels:
        name = hotel.get('name')
        address = hotel.get('formatted_address')
        maps_link = f"https://www.google.com/maps/search/?api=1&query={name.replace(' ', '+')}+{address.replace(' ', '+')}"
        
        # Find availability for this hotel in the loaded availability data
        availability = next((item["available"] for item in availability_data.get(town, []) if item["name"] == name), "Unknown")

        hotel_info = {
            'name': name,
            'address': address,
            'maps_link': maps_link,
            'availability': availability  # Default to "Unknown" if not found
        }
        towns_hotels[town].append(hotel_info)

    # Pause to respect rate limits
    time.sleep(0.2)

# Save the JSON file in the same directory as the script
hotels_file_path = os.path.join(script_dir, "hotels_hillsborough.json")
with open(hotels_file_path, "w") as file:
    json.dump(towns_hotels, file, indent=4)

print(f"Hotels data saved to {hotels_file_path}")
