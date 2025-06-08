import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO


def scrape_nba_stats():
    url = 'https://www.basketball-reference.com/leagues/NBA_2025_totals.html'
    tables = pd.read_html(url)
    df = tables[0]

    # Remove repeated headers and invalid rows
    df = df[df['Rk'] != 'Rk']
    df = df.dropna(subset=['Player'])
    df = df.fillna(0)

    # Convert numeric columns
    df[['PTS', 'AST', 'TRB']] = df[['PTS', 'AST', 'TRB']].apply(pd.to_numeric, errors='coerce')

    # Only return relevant columns
    df = df[['Player', 'Team', 'PTS', 'AST', 'TRB']]

    return df.to_dict(orient='records')
