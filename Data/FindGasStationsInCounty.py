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

# API key for Google Places
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

# Function to get gas stations in a given town
def get_gas_stations(town):
    params = {
        'query': f'gas stations in {town}',
        'key': API_KEY
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.json().get('results', [])
    else:
        print(f"Error fetching data for {town}: {response.status_code}")
        return []

# Main dictionary to store all gas stations for each town
towns_gas_stations = {}

# Loop through each town and get gas stations
for town in hillsborough_towns:
    print(f"Fetching gas stations for {town}...")
    gas_stations = get_gas_stations(town)
    towns_gas_stations[town] = []

    for station in gas_stations:
        name = station.get('name')
        address = station.get('formatted_address')
        maps_link = f"https://www.google.com/maps/search/?api=1&query={name.replace(' ', '+')}+{address.replace(' ', '+')}"
        
        station_info = {
            'name': name,
            'address': address,
            'maps_link': maps_link
        }
        towns_gas_stations[town].append(station_info)

    # Pause to respect rate limits
    time.sleep(0.2)

# Save the JSON file in the same directory as the script
output_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gas_stations_hillsborough.json")
with open(output_file_path, "w") as file:
    json.dump(towns_gas_stations, file, indent=4)

print(f"Data saved to {output_file_path}")
