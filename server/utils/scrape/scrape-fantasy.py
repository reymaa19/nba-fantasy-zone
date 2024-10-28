import json
from nba_api.stats.endpoints import FantasyWidget

FILE_LOCATION = "data/current_fantasy.json"

# Fetch fantasy scores for active players
fantasy_widget = FantasyWidget()
fantasy_scores = fantasy_widget.get_dict()

# Extract the relevant data
results = fantasy_scores['resultSets']

with open(FILE_LOCATION, 'w') as f:
    json.dump(results, f, indent=4)

print(FILE_LOCATION + " Updated")
