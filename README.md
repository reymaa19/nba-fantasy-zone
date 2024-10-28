# NBA Fantasy Zone

## Overview

NBA Fantasy Zone is a web application designed to enhance the experience of fantasy basketball fans. This platform aims to streamline the draft process, provide valuable insights, and offer an intuitive interface for managing fantasy basketball teams throughout the NBA season.

### Problem Space

Fantasy basketball participants often face challenges such as:

-   Lack of exciting fantasy draft web apps
-   Lack of real-time information during live drafts
-   Difficulty in tracking player statistics and projections
-   Inefficient team management tools
-   Limited ability to analyze draft strategies and outcomes

NBA Fantasy Zone addresses these pain points by offering a comprehensive solution that combines live draft support, player analysis, and team management features.

### User Profile

The target users for this application include:

-   Casual to hardcore NBA fans
-   Fantasy basketball players of all experience levels
-   League managers seeking efficient draft organization tools
-   Sports analytics enthusiasts

### Features

1. Live Draft Selection
2. Player Analysis
3. Team Management
4. Real-time NBA data integration
5. Post-draft reports

## Implementation

### Tech Stack

-   React
-   Python
-   shadcn/ui
-   Express
-   MySql

### APIs

-   [NBA.com API](https://github.com/swar/nba_api)
-   [NBA.com](https://www.nba.com/news/category/top-stories)
    <!-- - [Stats-tracker API](https://github.com/reymaa19/nba-stats-tracker) -->
    <!-- - [NBA News API](https://github.com/kevinn03/nba_api)-->
    <!-- - [Player images](https://github.com/GreenGuitar0/nba-players) -->

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
    USERS {
        uuid id PK "Primary key, UUID"
        string username "Unique username"
        string email "Unique email"
        string password_hash "Hashed password"
    }

    TEAMS {
        uuid id PK "Primary key, UUID"
        int score "Fantasy score"
        uuid user_id FK "Foreign key to Users table"
    }

    TEAMPLAYERS {
        uuid id "Unique identifier"
        uuid team_id FK "Foreign key to Teams table"
        uuid player_id FK "Foreign key to Players table"
    }

    PLAYERS {
        uuid id PK "Primary key, UUID"
        string full_name "Full name of the player"
        string first_name "First name of the player"
        string last_name "Last name of the player"
        string player_slug "Slug for the player"
        string height "Height of the player"
        string weight "Weight of the player"
        string position "Position of the player"
        string jersey "Jersey number of the player"
        string image_path "Path to the player's image"
    }

    CAREERTOTALSREGULARSEASON {
        uuid ID PK "Primary key, UUID"
        uuid PLAYER_ID FK "Foreign key to Players table"
        string LEAGUE_ID "League identifier"
        int TEAM_ID "Team identifier"
        int GP "Games played"
        int GS "Games started"
        float MIN "Minutes played"
        float FGM "Field goals made"
        float FGA "Field goals attempted"
        float FG_PCT "Field goal percentage"
        float FG3M "Three-point field goals made"
        float FG3A "Three-point field goals attempted"
        float FG3_PCT "Three-point field goal percentage"
        float FTM "Free throws made"
        float FTA "Free throws attempted"
        float FT_PCT "Free throw percentage"
        float OREB "Offensive rebounds"
        float DREB "Defensive rebounds"
        float REB "Total rebounds"
        float AST "Assists"
        float STL "Steals"
        float BLK "Blocks"
        float TOV "Turnovers"
        float PF "Personal fouls"
        float PTS "Points"
    }

    SEASONTOTALSREGULARSEASON {
        uuid ID PK "Primary key, UUID"
        uuid PLAYER_ID FK "Foreign key to Players table"
        string SEASON_ID "Season identifier"
        string LEAGUE_ID "League identifier"
        int TEAM_ID "Team identifier"
        string TEAM_ABBREVIATION "Team abbreviation"
        int PLAYER_AGE "Player age"
        int GP "Games played"
        int GS "Games started"
        float MIN "Minutes played"
        float FGM "Field goals made"
        float FGA "Field goals attempted"
        float FG_PCT "Field goal percentage"
        float FG3M "Three-point field goals made"
        float FG3A "Three-point field goals attempted"
        float FG3_PCT "Three-point field goal percentage"
        float FTM "Free throws made"
        float FTA "Free throws attempted"
        float FT_PCT "Free throw percentage"
        float OREB "Offensive rebounds"
        float DREB "Defensive rebounds"
        float REB "Total rebounds"
        float AST "Assists"
        float STL "Steals"
        float BLK "Blocks"
        float TOV "Turnovers"
        float PF "Personal fouls"
        float PTS "Points"
    }

    CURRENTFANTASYSEASON {
        uuid ID PK "Primary key, UUID"
        uuid PLAYER_ID FK "Foreign key to Players table"
        string PLAYER_NAME "Player name"
        string PLAYER_POSITION "Player position"
        int TEAM_ID "Team identifier"
        string TEAM_ABBREVIATION "Team abbreviation"
        int GP "Games played"
        float MIN "Minutes played"
        float FAN_DUEL_PTS "FanDuel points"
        float NBA_FANTASY_PTS "NBA Fantasy points"
        float PTS "Points"
        float REB "Rebounds"
        float AST "Assists"
        float BLK "Blocks"
        float STL "Steals"
        float TOV "Turnovers"
        float FG3M "Three-point field goals made"
        float FGA "Field goals attempted"
        float FG_PCT "Field goal percentage"
        float FTA "Free throws attempted"
        float FT_PCT "Free throw percentage"
    }

    USERS ||--o{ TEAMS : "has"
    TEAMS ||--o{ TEAMPLAYERS : "has"
    PLAYERS ||--o{ TEAMPLAYERS : "has"
    PLAYERS ||--o{ CAREERTOTALSREGULARSEASON : "has"
    PLAYERS ||--o{ SEASONTOTALSREGULARSEASON : "has"
    PLAYERS ||--o{ CURRENTFANTASYSEASON : "has"
```

### Endpoints

User Management: <br>
POST /api/register/ <br>
POST /api/login/ <br>

Player Information: <br>
GET /api/players/ <br>

Statistics: <br>
GET /api/stats/career/ <br>
GET /api/stats/lastSeason/:id<br>
GET /api/stats/lastSeason<br>

Team Management: <br>
POST /api/teams/ <br>
GET /api/teams/ <br>
GET /api/teams/:user_id <br>

News Information:
GET /api/news/:count <br>

Fantasy points:
GET /api/fantasy/<br>

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

-   **League Management**
-   AI opponent teams
-   AI-powered draft recommendations
-   Advanced player projections
-   Trade proposal system
-   Waiver wire functionality
-   Advanced analytics and reporting
-   Social features and sharing

## Running the App Locally

To run the NBA Fantasy Zone app on your local machine, follow these steps:

### Prerequisites

Ensure you have the following installed:

-   Node.js (v14.x or later)
-   npm (v6.x or later)
-   Python (v3.x)
-   MySQL

### Setup Instructions

1. **Clone the repository:**

    ```sh
    git clone https://github.com/reymaa19/nba-fantasy-zone.git
    cd nba-fantasy-zone
    ```

2. **Set up the server environment:**

    - Navigate to the `server` directory:
        ```sh
        cd server
        ```
    - Copy the `.env.example` file to `.env` and fill in the required environment variables:
        ```sh
        cp .env.example .env
        ```
    - Update the `.env` file with your local database credentials and other necessary configurations.

3. **Install server dependencies:**

    ```sh
    npm install
    ```

4. **Run database migrations and seeds:**

    ```sh
    npm run migrate
    npm run seed
    ```

5. **Start the server:**

    ```sh
    npm run dev
    ```

6. **Set up the client environment:**

    - Navigate to the `client` directory:
        ```sh
        cd ../client
        ```
    - Copy the `.env.example` file to `.env` and fill in the required environment variables:
        ```sh
        cp .env.example .env
        ```

7. **Install client dependencies:**

    ```sh
    npm install
    ```

8. **Start the client:**
    ```sh
    npm run dev
    ```

### Accessing the App

-   Once both the server and client are running, open your browser and navigate to `http://localhost:3000` to access the NBA Fantasy Zone app.

-   Setting up a Python virtual environment is only necessary if you intend to utilize the python scripts in the server/utils/scape directory (More info inside server/script).

### Setting up Python virtual environment:

Change directory into the server

```sh
cd server
```

Create a virtual environment

```sh
python3 -m venv venv
```

Activate the virtual environment (Linux/Mac)

```sh
source venv/bin/activate
```

Activate the virtual environment (Windows)

```sh
.\venv\Scripts\activate
```

Install the required packages

```sh
pip install -r server/utils/scrape/requirements.txt

```
