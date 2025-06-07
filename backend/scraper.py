import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO


def scrape_nba_stats():
    URL = "https://www.basketball-reference.com/leagues/NBA_2024_per_game.html"

    response = requests.get(URL)
    soup = BeautifulSoup(response.content, 'html.parser')
    table = soup.find('table', {'id': 'per_game_stats'})

    df = pd.read_html(StringIO(str(table)))[0]
    df = df[df.Player != "Player"]
    df.iloc[:, 5:] = df.iloc[:, 5:].apply(pd.to_numeric, errors='coerce')
    
    return df.head(1).to_dict(orient='records')  # send top 15 players
