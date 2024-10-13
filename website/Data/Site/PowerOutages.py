import requests
from bs4 import BeautifulSoup

# URL of the webpage to download
url = "https://poweroutage.us/area/county/315"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Create a dictionary to store county data
    county_data = {}

    # Extract county information
    county_info = soup.find("h1").text.strip()
    county_data['County'] = county_info

    # Extract total customers tracked and customers out
    total_customers = int(soup.find(string="Customers Tracked").find_next().text.strip().replace(",", ""))
    customers_out = int(soup.find(string="Customers Out").find_next().text.strip().replace(",", ""))

    # Calculate outage percentage
    if total_customers > 0:
        outage_percentage = (customers_out / total_customers) * 100
    else:
        outage_percentage = 0

    county_data['Total Customers Tracked'] = total_customers
    county_data['Customers Out'] = customers_out
    county_data['Outage Percentage'] = f"{outage_percentage:.2f}%"

    # Create a list to store provider data
    providers_data = []

    # Extract provider data
    provider_table = soup.find("table")
    if provider_table:
        rows = provider_table.find_all("tr")[1:]  # Skip header row
        for row in rows:
            columns = row.find("td", class_="row")  # Find the row with class 'row'
            if columns:
                provider_info = {}
                provider_info['Provider'] = columns.find("a").text.strip()
                provider_info['Customers Tracked'] = columns.find_all("div", class_="text-right")[0].text.strip()
                provider_info['Customers Out'] = columns.find_all("div", class_="text-right")[1].text.strip()
                provider_info['Last Updated'] = columns.find("small").text.strip()
                providers_data.append(provider_info)

    county_data['Providers'] = providers_data

    # Print the dictionary
    print(county_data)

else:
    print("Failed to retrieve the webpage.")