import json
import urllib.request
import urllib.parse
from datetime import datetime
import os

def get_news_by_county(county, gnews_api_key, max_results=10):
    if not county:
        return []

    # URL-encode the county name to handle spaces and special characters
    encoded_county = urllib.parse.quote(county)

    # Construct the API URL with the encoded county name
    url = f"https://gnews.io/api/v4/search?q={encoded_county}&lang=en&country=us&max={max_results}&apikey={gnews_api_key}"

    # Fetching the data from the API
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode("utf-8"))
        articles = data.get("articles", [])

    return articles

def save_to_json_file(articles, county_name):

    format_name = county_name.replace(" ", "_").lower()

    file_path = os.path.join("Data", f"{format_name}.json")

    news_list = [{"title": article['title'], "url": article['url'], "date": format_date(article['publishedAt'])} for article in articles]
    data = {"county": county_name, "news": news_list}

    # Save the JSON file in the Data directory
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print(f"News data saved to {file_path}")


def format_date(published_date):
    date_object = datetime.strptime(published_date, "%Y-%m-%dT%H:%M:%SZ")
    
    # Format the date into a more readable format: 'Month Day, Year, HH:MM AM/PM'
    formatted_date = date_object.strftime("%B %d, %Y, %I:%M %p")
    
    return formatted_date

def get_and_save_news(county_name, gnews_api_key):
    articles = get_news_by_county(county_name, gnews_api_key)
    
    if articles:
        save_to_json_file(articles, county_name)
    else:
        print(f"No news found for {county_name}.")

def main():
    county_name = "hillsborough county"
    gnews_api_key = "97c888bb4923ae4cbe43864a89821fa7" 

    get_and_save_news(county_name, gnews_api_key)

if __name__ == "__main__":
    main()
