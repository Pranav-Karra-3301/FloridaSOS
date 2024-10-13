import requests
from datetime import datetime

api_url = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=state eq 'FL' and substringof('MILTON', declarationTitle)"

def get_fema_data():
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print("Failed to fetch data from FEMA API")
        return None
fema_data = get_fema_data()

if fema_data:
    # Step 2: Extract relevant information from API response
    disaster_summaries = fema_data.get("DisasterDeclarationsSummaries", [])
    if disaster_summaries:
        incident_title = disaster_summaries[0].get("declarationTitle", "Unknown Incident")
        incident_start_raw = disaster_summaries[0].get("incidentBeginDate", "Unknown Start Date")
        incident_end_raw = disaster_summaries[0].get("incidentEndDate", None)
        designated_areas = [entry.get("designatedArea", "Unknown Area") for entry in disaster_summaries]

        # Convert raw date strings to readable format
        incident_start = datetime.fromisoformat(incident_start_raw.replace("Z", "")).strftime("%B %d, %Y") if incident_start_raw != "Unknown Start Date" else "Unknown Start Date"
        incident_end = datetime.fromisoformat(incident_end_raw.replace("Z", "")).strftime("%B %d, %Y") if incident_end_raw else None
    else:
        incident_title = "Unknown Incident"
        incident_start = "Unknown Start Date"
        incident_end = None
        designated_areas = []

if incident_end is None:
        # Incident is ongoing
        subject = f"Alert: {incident_title} Ongoing"
        body = (
            f"{incident_title} started on {incident_start} and is currently ongoing.\n"
            f"Affected areas: {', '.join(designated_areas)}.\n"
            f"Please stay safe and follow local guidance."
        )
else:
    # Incident has ended
    subject = f"Update: {incident_title} Ended"
    body = (
        f"The hurricane '{incident_title}' that started on {incident_start} has ended on {incident_end}.\n"
        f"Affected areas were: {', '.join(designated_areas)}." 
        )
    
output_msg = subject + "\n" + body
