import json
import os
from nba_api.stats.endpoints import playercareerstats
import time

# Paths to the JSON files
active_players_path = '/home/reynald/current/server/data/active_players.json'
output_path = '/home/reynald/current/server/data/data.json'

# Read the active_players.json file
with open(active_players_path, 'r') as f:
    active_players = json.load(f)

# Initialize a dictionary to store the combined stats
if os.path.exists(output_path):
    with open(output_path, 'r') as f:
        combined_stats = json.load(f)
else:
    combined_stats = []

# Fetch career stats for each player
for player in active_players:
    player_id = player['id']
    
    # Check if the player's stats are already in the combined_stats
    if not any(player['id'] == player_id for player in combined_stats):
        # Fetch career stats
        averages = playercareerstats.PlayerCareerStats(player_id=player_id, per_mode36='PerGame')
        totals = playercareerstats.PlayerCareerStats(player_id=player_id, per_mode36='Totals')
        
        # Parse the JSON responses
        parsed_averages = json.loads(averages.get_json())
        parsed_totals = json.loads(totals.get_json())
        
        # Add the player's stats to the combined_stats
        combined_stats.append({
            "id": player_id,
            "stats": {
                'averages': parsed_averages,
                'totals': parsed_totals
            },
        })
        
        # Update the JSON file immediately
        with open(output_path, 'w') as f:
            json.dump(combined_stats, f, indent=4)
        
        print("Fetched and updated stats for player", player["full_name"])
        time.sleep(15) # Sleep for 15 seconds to avoid hitting the API rate limit

print('Done!')
