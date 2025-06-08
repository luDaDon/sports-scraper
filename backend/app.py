from flask import Flask, jsonify
from flask_cors import CORS
from scraper import scrape_nba_stats

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:3000",
    "https://sports-scraper.vercel.app",
    "https://sports-scraper-git-search-text-ludadons-projects.vercel.app"
]}})


@app.route('/api/scrape')
def scrape():
    data = scrape_nba_stats()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
