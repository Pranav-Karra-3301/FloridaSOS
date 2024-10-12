import json
import urllib.request
import urllib.parse
from datetime import datetime
import os

def get_news_by_city(city, natural_disaster, gnews_api_key, max_results=10):
    if not city or not natural_disaster:
        return []

    # URL-encode the city name to handle spaces and special characters
    encoded_city = urllib.parse.quote(city)
    encoded_natural_disaster = urllib.parse.quote(natural_disaster)
    query = f"{encoded_city}%20{encoded_natural_disaster}"

    # Construct the API URL with the encoded city name
    url = f"https://gnews.io/api/v4/search?q={query}&lang=en&country=us&max={max_results}&sortby=publishedAt&apikey={gnews_api_key}"

    # Fetching the data from the API
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode("utf-8"))
        articles = data.get("articles", [])

    return articles

def save_to_json_file(articles, city_name):

    format_name = city_name.replace(" ", "_").lower()

    file_path = os.path.join("Data", f"{format_name}.json")

    news_list = [{"title": article['title'], "url": article['url'], "date": format_date(article['publishedAt'])} for article in articles]
    data = {"city": city_name, "news": news_list}

    # Save the JSON file in the Data directory
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print(f"News data saved to {file_path}")


def format_date(published_date):
    date_object = datetime.strptime(published_date, "%Y-%m-%dT%H:%M:%SZ")
    
    # Format the date into a more readable format: 'Month Day, Year, HH:MM AM/PM'
    formatted_date = date_object.strftime("%B %d, %Y, %I:%M %p")
    
    return formatted_date

def get_and_save_news(city_name, natural_disaster, gnews_api_key):
    articles = get_news_by_city(city_name, natural_disaster, gnews_api_key)
    
    if articles:
        save_to_json_file(articles, city_name)
    else:
        print(f"No news found for {city_name}.")

def main():
    natural_disaster = "hurricane"
    city_name = "Tampa"
    gnews_api_key = "97c888bb4923ae4cbe43864a89821fa7" 

    get_and_save_news(city_name, natural_disaster, gnews_api_key)

if __name__ == "__main__":
    main()
