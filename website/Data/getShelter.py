import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def get_shelters(zipcode):
    url = f"https://www.hud.gov/findshelter/Search?search-for=shelter&place={zipcode}&keyword="
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run Chrome in headless mode
    driver = webdriver.Chrome(options=chrome_options)
    
    driver.get(url)
    
    # Wait for the results to load
    wait = WebDriverWait(driver, 10)
    results = wait.until(EC.presence_of_element_located((By.ID, "results")))
    
    shelters = []
    shelter_items = results.find_elements(By.XPATH, "./li")
    
    for item in shelter_items:
        name = item.find_element(By.TAG_NAME, "h6").text.strip()
        details = item.find_element(By.CLASS_NAME, "result-detail")
        
        address = details.find_element(By.CLASS_NAME, "address").text.strip()
        
        try:
            website = details.find_element(By.CLASS_NAME, "web").find_element(By.TAG_NAME, "a").get_attribute("href")
        except:
            website = "N/A"
        
        try:
            phone = details.find_element(By.CLASS_NAME, "phone").text.strip()
        except:
            phone = "N/A"
        
        try:
            directions = details.find_element(By.CLASS_NAME, "directions").find_element(By.TAG_NAME, "a").get_attribute("href")
        except:
            directions = "N/A"
        
        shelter = {
            'name': name,
            'address': address,
            'website': website,
            'phone': phone,
            'directions': directions
        }
        shelters.append(shelter)
    
    driver.quit()
    
    # Debug: Print the scraped shelter data
    print("\nScraped shelter data:")
    print(json.dumps(shelters, indent=2))
    
    return shelters

def save_to_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)

def main():
    zipcode = input("Enter the zipcode to search for shelters: ")
    shelters = get_shelters(zipcode)
    
    if shelters:
        filename = f"shelters_{zipcode}.json"
        save_to_json(shelters, filename)
        print(f"Shelter information saved to {filename}")
    else:
        print("No shelters found for the given zipcode.")

if __name__ == "__main__":
    main()
