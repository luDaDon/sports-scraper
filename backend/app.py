from flask import Flask, jsonify
from flask_cors import CORS
from scraper import scrape_nba_stats

app = Flask(__name__)
CORS(app)

@app.route('/api/scrape')
def scrape():
    data = scrape_nba_stats()
    print(type(data))     # Should be <class 'list'>
    print(type(data[0])) 
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
