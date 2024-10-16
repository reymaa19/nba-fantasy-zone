# NBA Fantasy Zone 

## Overview

NBA Fantasy Zone is a web application designed to enhance the experience of fantasy basketball fans. This platform aims to streamline the draft process, provide valuable insights, and offer an intuitive interface for managing fantasy basketball teams throughout the NBA season.

### Problem Space

Fantasy basketball participants often face challenges such as:
- Lack of exciting fantasy draft web apps
- Lack of real-time information during live drafts
- Difficulty in tracking player statistics and projections
- Inefficient team management tools
- Limited ability to analyze draft strategies and outcomes

NBA Fantasy Zone addresses these pain points by offering a comprehensive solution that combines live draft support, player analysis, and team management features.

### User Profile

The target users for this application include:

- Casual to hardcore NBA fans
- Fantasy basketball players of all experience levels
- League managers seeking efficient draft organization tools
- Sports analytics enthusiasts

### Features

1. Live Draft Selection
2. Player Analysis
3. Team Management
4. Real-time NBA data integration
5. Post-draft reports

## Implementation

### Tech Stack

- React
- Sass
- Node
- Express
- MySql
- Axios

### APIs

- [NBA.com API](https://github.com/swar/nba_api)
- [balldontlie API](https://github.com/ynnadkrap/balldontlie)
- [stats-tracker API](https://github.com/reymaa19/nba-stats-tracker)
- [NBA News API](https://github.com/kevinn03/nba_api)


### Sitemap
1. Home <br>
2. Login/Register
3. Dashboard <br>
3.1. My Team <br>
3.2. Other Teams<br>
4. Draft Room <br>
4.1. Live Draft Board <br>
4.2. Player Pool <br>
4.3. Team Roster <br>
5. Player Analysis <br>
5.1. Player Profile <br>
5.2. Comparison Tool <br>
6. User Profile <br>
6.1. Account Settings
<!-- 7. Team Management <br>
7.1. Roster Management <br>
7.2. Trade Center <br> -->

### Data
```mermaid
erDiagram
    USER ||--o{ TEAM : "owns"
    TEAM ||--|{ TEAM_PLAYER : "has"
    PLAYER ||--|{ TEAM_PLAYER : "is part of"
    PLAYER ||--|| PLAYER_STATS : "has"

    USER {
        string id PK
        string username
        string email
        string password_hash
    }

    TEAM {
        string id PK
        string name
        string user_id FK
    }

    PLAYER {
        string id PK
        string name
        string position
    }

    TEAM_PLAYER {
        string id PK
        string team_id FK
        string player_id FK
    }

    PLAYER_STATS {
        string id PK
        string player_id FK
        float avg_points
        float avg_rebounds
        float avg_assists
        int total_points
        int total_rebounds
        int total_assists
    }
```

### Endpoints
User Management: <br>
POST /api/users/register <br>
POST /api/users/login <br>
GET /api/users/profile <br>

Player Information: <br>
GET /api/players <br>
GET /api/players/{position} <br>
GET /api/players/{playerId}/totals <br>
GET /api/players/{playerId}/stats <br>
GET /api/players/{playerId}/current <br>

Team Management: <br>
POST /api/teams/ <br>
GET /api/teams/{teamId} <br>
<!-- PUT /api/teams/{teamId} <br> -->
<!-- POST /api/teams/{teamId}/trade <br> -->

<!-- Draft Operations: <br>
POST /api/drafts/start <br>
GET /api/drafts/{draftId}/status <br>
POST /api/drafts/{draftId}/pick <br> -->

## Roadmap
1. Project Setup and Infrastructure <br>
    1.1. Set up version control (Git repository) <br>
    1.2. Initialize frontend project with React <br>
    1.3. Set up backend project with Node.js and Express <br>
    1.4. Configure MySQL database <br>
    1.5. Implement API structure with Express <br>

2. User Authentication <br>
    2.1. Implement user registration functionality <br>
    2.2. Create login system <br>
    2.3. Set up JWT for session management <br>
    2.4. Design and implement user profile pages <br>

3. Player Database <br>
    3.1. Design player data model <br>
    3.2. Integrate with a basic NBA player stats API <br>
    3.3. Implement player search functionality <br>
    3.4. Create player profile cards with basic stats <br>
    3.5. Develop a system to regularly update player data <br>

4. Draft Room - Basic Functionality <br>
    4.1. Design and implement draft room UI <br>
    4.2. Create draft order generation system <br>
    4.3. Implement basic player selection mechanism <br>

5. Basic Scoring System <br>
    5.1. Implement a standard scoring system <br>
    5.2. Create a basic algorithm to calculate team scores based on player performances <br>
    5.3. Develop a simple leaderboard for all teams<br>

6. User Interface and Experience <br>
    6.1. Design and implement a responsive layout for the main pages <br>
    6.2. Create a navigation system between different sections of the app <br>
    6.3. Implement basic error handling and user feedback mechanisms <br>

## Future Implementations
- **League Management**
- AI-powered draft recommendations
- Advanced player projections
- Trade proposal system
- Waiver wire functionality
- Advanced analytics and reporting
- Social features and sharing