import requests
from bs4 import BeautifulSoup
import re
import uuid
import json
import os
import shutil

# Function to clear the directory
def clear_directory(directory):
    if os.path.exists(directory):
        shutil.rmtree(directory)
    os.makedirs(directory)

def download_image(url, save_path):
    response = requests.get(url)

    if response.status_code == 200:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        # Open a file in binary write mode and save the image content
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Image successfully downloaded: {save_path}")
    else:
        print(f"Failed to retrieve the image. Status code: {response.status_code}")

def scrape_stories():
    base = 'https://www.nba.com/news/category/top-stories'

    clear_directory('public/news_images')

    response = requests.get(base)

    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # the class name always includes ArticleTile_tile example class="ArticleTile_tile__y70gI"
        articles = soup.findAll('article', {'class': re.compile(r'ArticleTile_tile')})
        stories = []

        for article in articles:
            id = f'{uuid.uuid4()}'
            img_tag = article.find('img')
            if img_tag and 'src' in img_tag.attrs:
                src = img_tag['src']
                title = article.find('h3').text if article.find('h3') else 'No title'
                description = article.find('p').text if article.find('p') else 'No description'
                filename = f"public/news_images/{id}.jpg"

                download_image(src, filename)

                story = {"id": id, "img": filename, "title": title, "description": description}
                stories.append(story)

        with open("data/current_news.json", 'w') as f:
            json.dump(stories, f, indent=4)
            
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
        return []

scrape_stories()