# Twitter-Dashboard

## Application used to scrape tweets off of twitter.
Sentiment analysis is performed on tweets

Uses twitter login info

### In terminal
```
cd flask-server
source venv/bin/activate
python3 server.py

cd ../client
npm install
npm start
```

### Adjusting the number of tweets scraped
navigate to flask-server/scrape.py
on the line 100
```
        while scrolling and len(data) < 10:
```
change 10 to the number desired
IMPORTANT: RECOMMENDED MAX IS 600 TO REMAIN
WITHIN TWITTER TERMS AND SERVICE
