from flask import Flask, request, jsonify
from scrape import scrape_tweets

app = Flask(__name__)


@app.route('/scrape', methods=['POST'])
def scrape():
    search_query = request.json.get('search_query')
    if not search_query:
        return jsonify({'error': 'Search query is required'}), 400

    # Call the scraping function with the search query
    scraped_data = scrape_tweets(search_query)

    # Return the scraped data as JSON
    return jsonify(scraped_data)


if __name__ == '__main__':
    app.run(debug=True)
