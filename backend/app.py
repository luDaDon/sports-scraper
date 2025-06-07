from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

def scrape_nba_stats():
    df = pd.DataFrame([{
        "Player": "Joel Embiid",
        "Team": "PHI",
        "PTS": 34.7,
        "AST": 5.6,
        "TRB": 11.0
    }])
    return df.to_dict(orient="records")

@app.route('/api/scrape')
def scrape():
    data = scrape_nba_stats()
    print("data:", data)
    print("type:", type(data))
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
