import json
import requests
from bs4 import BeautifulSoup
import boto3

s3 = boto3.client('s3')

def scrape_letterboxd_diary(username):
    base_url = f"https://letterboxd.com/{username}/films/diary/page/{{}}/"
    page_number = 1
    all_entries = []
    last_page = False
    
    while not last_page:
        url = base_url.format(page_number)
        response = requests.get(url)
        
        if response.status_code != 200:
            print(f"Failed to retrieve page {page_number} with status code {response.status_code}")
            break
        
        soup = BeautifulSoup(response.text, 'html.parser')
        diary_entries = soup.find_all('a', class_='edit-review-button')
        
        for entry in diary_entries:
            date_watched = entry.get('data-viewing-date-str', '')
            rating_text = entry.get('data-rating', 'No Rating')
            rewatch_tag = entry.get('data-rewatch', 'false')
            film_title = entry.get('data-film-name', '')
            release_year = entry.get('data-film-year', '')
            review_text = entry.get('data-review-text', '')

            # Convert rating_text to 5-star scale if applicable
            if rating_text.isdigit():  # Check if rating_text is a digit (like '7')
                rating_text = float(rating_text) / 2
            
            entry_data = {
                "date_watched": date_watched,
                "rewatch": rewatch_tag,
                "film_title": film_title,
                "release_year": release_year,
                "review_text": review_text,
                "rating": rating_text,
            }
            all_entries.append(entry_data)
        
        # Check if this is the last page
        paginate_tag = soup.find('li', class_='paginate-page')
        next_page_tag = soup.find('a', class_='next')
        if not next_page_tag:
            last_page = True
        else:
            page_number += 1
    
    
    return all_entries

def lambda_handler(event, context):
    bucket = 'letterboxdscraper'
    username = event.get('username', 'bravefish')  # Default to 'bravefish' if no username is provided
    diary_data = scrape_letterboxd_diary(username)
    
    fileName = f"{username}.json"
    
    uploadByteStream = bytes(json.dumps(diary_data).encode('UTF-8'))
    
    s3.put_object(Bucket=bucket, Key=fileName, Body=uploadByteStream)
    
    return {
        "statusCode": 200,
        "body": json.dumps(diary_data)}

if __name__ == "__main__":
    username = "bravefish"  # or your Letterboxd username
    entries = scrape_letterboxd_diary(username)

    print(f"Found {len(entries)} entries")
    print(json.dumps(entries[:3], indent=2))  # preview first 3

