import json
from nba_api.stats.endpoints import FantasyWidget

# Fetch fantasy scores for active players
fantasy_widget = FantasyWidget()
fantasy_scores = fantasy_widget.get_dict()

# Extract the relevant data
results = fantasy_scores['resultSets']

with open("data/current_fantasy.json", 'w') as f:
    json.dump(results, f, indent=4)
