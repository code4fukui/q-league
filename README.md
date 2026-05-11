# q-league

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Open data for the Kyushu Women's Soccer League (九州女子サッカーリーグ), including teams and players. This repository contains the scrapers used to gather the data and a simple web viewer for the player list.

## Demo

- [九州女子サッカーリーグ 選手一覧 (Player List Viewer)](https://code4fukui.github.io/q-league/)

## Open Data

- [**q-league.csv**](./q-league.csv): A list of all teams with details such as league division, staff, and uniform colors.
- [**q-league-player.csv**](./q-league-player.csv): A complete roster of players, including their name, position, number, and team.

## Usage

This project uses the [Deno](https://deno.land/) runtime to execute the scraping scripts.

1.  **Fetch Team Index**

    This script scrapes the main divisions page to get a list of all teams and their page URLs, saving the result to `q-league-index.csv`.
    ```sh
    deno run -A scrape.js
    ```

2.  **Fetch Team and Player Details**

    This script reads `q-league-index.csv`, visits each team's page, and scrapes detailed information. It generates the final datasets: `q-league.csv` (detailed team data) and `q-league-player.csv` (player data).
    ```sh
    deno run -A scrape2.js
    ```

3.  **View Data**

    Open `index.html` in your web browser to view an interactive, sortable table of the player data.

## Data Schema

### `q-league.csv`

Contains detailed information for each team. Key columns include:
- `name`: Team name
- `league`: League division (e.g., 1部リーグ)
- `url`: URL to the team's page on the official site
- `phrase`: Team slogan/phrase
- `director`: Head coach/director
- `coach`: Coach
- `shirt_FP_main`, `shorts_FP_main`, `socks_FP_main`: Uniform colors for the main field player kit
- `shirt_FP_sub`, `shorts_FP_sub`, `socks_FP_sub`: Uniform colors for the sub field player kit
- (and corresponding `_GK_` columns for goalkeeper kits)

### `q-league-player.csv`

- `name`: Player's full name
- `position`: Player's position (e.g., GK, DF)
- `no`: Jersey number
- `team_name`: Name of the player's team
- `team_league`: The team's league division
- `url`: URL to the player's team page

## References

- **Data Source:** [九州女子サッカーリーグ公式サイト](https://q-league.net/)
- **Scraping Library:** [scrapeutil.js](https://github.com/code4fukui/scrapeutil/)

## License

MIT