import json
from nba_api.stats.static import players

# Get all active players
active_players = players.get_active_players()

# Format the list of active players
formatted_players = [
    {
        "id": player["id"],
        "full_name": player["full_name"],
        "first_name": player["first_name"],
        "last_name": player["last_name"],
    }

    for player in active_players
]

# Save the formatted list of active players to a JSON file
with open('data/active_players.json', 'w') as f:
    json.dump(formatted_players, f, indent=4)
