import json
from openai import OpenAI
from datetime import datetime

# Load API key
with open('api.json', 'r') as f:
    api_config = json.load(f)
    client = OpenAI(api_key=api_config['gptApiKeys']['key'])

# Load Hillsborough County data
with open('Data/hillsborough_county.json', 'r') as f:
    hillsborough_data = json.load(f)

def summarize_texts(urls):
    try:
        urls_text = "\n".join(urls)
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": f"Visit these URLs:\n{urls_text}\nProvide a summary of all the content in 100 words."}
            ],
            max_tokens=150
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error in summarization: {str(e)}")
        return None

urls = [item['url'] for item in hillsborough_data['news']]
summary = summarize_texts(urls)

timeline = [{
    'title': "Hillsborough County News Summary",
    'url': ", ".join(urls),
    'summary': summary,
    'date': datetime.now().strftime('%B %d, %Y, %I:%M %p')
}]

# Save the timeline to a JSON file
with open('Data/hillsborough_timeline.json', 'w') as f:
    json.dump(timeline, f, indent=2)

print("Timeline has been generated and saved to Data/hillsborough_timeline.json")
