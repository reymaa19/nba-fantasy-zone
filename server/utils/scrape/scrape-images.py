import requests
from bs4 import BeautifulSoup
import json
import re
import os
import time
import os.path


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
        print(f"Failed to retrieve the image. Status code: {
              response.status_code}")


def scrape_images():
    base = 'https://www.nba.com/player/'
    players = json.load(open('active_players_info.json'))

    for player in players:
        if (os.path.exists(f"public/player_images/{player['id']}.png")):
            print(f"Image already exists for {player['player_slug']}")
            continue

        response = requests.get(
            base + str(player['id']) + '/' + player['player_slug'])

        if response.status_code == 200:
            print(base + str(player['id']) + '/' + player['player_slug'])
            soup = BeautifulSoup(response.content, 'html.parser')

            try:
                img = soup.findAll('img', {'class': re.compile(r'PlayerImage_image')})[
                    0]['src']
                download_image(img, f"public/player_images/{player['id']}.png")
            except IndexError:  # If the image is not found, it might be because hes transitioning from the GLeague
                img = soup.findAll('div', {'class': re.compile(r'PlayerImage_playerImage')})[
                    0].find('img')['src']
                fileName = f"public/player_images/{player['id']}.png"
                download_image(img, fileName)

            time.sleep(5)
            print("---")

        else:
            print(f"Failed to retrieve {player['player_slug']}. Status code: {
                  response.status_code}")

    print("Scraping complete")


scrape_images()
