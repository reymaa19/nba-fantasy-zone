import json
import os
import time
from nba_api.stats.endpoints import CommonPlayerInfo

# Paths to the input and output files
input_path = 'data/active_players.json'
output_path = 'data/active_players_info.json'

# Read the active_players.json file
with open(input_path, 'r') as f:
    active_players = json.load(f)

# Initialize a list to store the updated player info
if os.path.exists(output_path):
    with open(output_path, 'r') as f:
        active_players_info = json.load(f)
else:
    active_players_info = []

# Create a dictionary for quick lookup of existing players
existing_players = {player['id']: player for player in active_players_info}

# Function to get player info
def get_player_info(player_id):
    player_info = CommonPlayerInfo(player_id=player_id)
    parsed_player_info = json.loads(player_info.get_json())
    common_info = parsed_player_info['resultSets'][0]['rowSet'][0]
    headers = parsed_player_info['resultSets'][0]['headers']
    info_dict = dict(zip(headers, common_info))
    return {
        'player_slug': info_dict.get('PLAYER_SLUG'),
        'height': info_dict.get('HEIGHT'),
        'weight': info_dict.get('WEIGHT'),
        'position': info_dict.get('POSITION'),
        'jersey': info_dict.get('JERSEY')
    }

# Update each player with additional info
for player in active_players:
    player_id = player['id']
    
    # Check if the player's info is already in the active_players_info
    if player_id not in existing_players:
        player_info = get_player_info(player_id)
        player.update(player_info)
        active_players_info.append(player)
        
        # Update the JSON file immediately
        with open(output_path, 'w') as f:
            json.dump(active_players_info, f, indent=4)
        
        print("Fetched and updated info for player", player["full_name"])
        time.sleep(5) # Sleep for 5 seconds to avoid hitting the API rate limit

print("Done!")