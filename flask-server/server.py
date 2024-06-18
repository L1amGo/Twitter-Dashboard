# server.py
from flask import Flask, request, jsonify
from scrape import scrape_tweets

app = Flask(__name__)


# def calculate_sentiment_counts(tweets):
#     sentiment_counts = {'positive': 0, 'neutral': 0, 'negative': 0}
#     for tweet in tweets:
#         sentiment = max(tweet[7:10])
#         if sentiment == tweet[7]:
#             sentiment_counts['negative'] += 1
#         elif sentiment == tweet[8]:
#             sentiment_counts['neutral'] += 1
#         elif sentiment == tweet[9]:
#             sentiment_counts['positive'] += 1
#     return sentiment_counts


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
        # sentiment_counts = calculate_sentiment_counts(scraped_data)

        response_data = {
            'tweets': scraped_data
            # ,'sentiment_counts': sentiment_counts
        }

        return jsonify(response_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
