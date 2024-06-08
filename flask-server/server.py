# app.py
from flask import Flask, request, jsonify
from scrape import scrape_tweets

app = Flask(__name__)


@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phone_number')
    search_query = data.get('search_query')

    if not email or not password or not phone_number or not search_query:
        return jsonify({'error': 'All fields are required'}), 400

    try:
        scraped_data = scrape_tweets(
            email, password, phone_number, search_query)
        return jsonify(scraped_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
