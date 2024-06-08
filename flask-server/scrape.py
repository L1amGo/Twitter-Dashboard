from selenium.webdriver import Chrome
# scrape.py
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, WebDriverException
from time import sleep
import logging

logging.basicConfig(level=logging.INFO)


def get_tweet_data(tweet):
    """Extract data from tweet data"""
    username = tweet.find_element("xpath", ".//span").text
    handle = tweet.find_element("xpath", ".//span[contains(text(), '@')]").text
    try:
        timestamp = tweet.find_element(
            "xpath", ".//time").get_attribute('datetime')
    except NoSuchElementException:
        return
    comment = tweet.find_element("xpath", ".//div[2]/div[2]/div[2]").text
    response = tweet.find_element("xpath", ".//div[2]/div[2]/div[3]").text
    text = comment + response
    reply = tweet.find_element("xpath", ".//button[@data-testid='reply']").text
    repost = tweet.find_element(
        "xpath", ".//button[@data-testid='retweet']").text
    like = tweet.find_element("xpath", ".//button[@data-testid='like']").text

    tweet = (username, handle, timestamp, text, reply, repost, like)
    return tweet


def scrape_tweets(email, password, phone_number, search_query):
    driver = Chrome()
    driver.get('https://www.twitter.com/login')
    sleep(8)

    try:
        # logging in
        username = driver.find_element("xpath", "//input[@name='text']")
        username.send_keys(email)
        username.send_keys(Keys.RETURN)

        sleep(6)
        try:
            phone = driver.find_element("xpath", "//input[@name='text']")
            phone.send_keys(phone_number)
            phone.send_keys(Keys.RETURN)
            sleep(6)
        except NoSuchElementException:
            pass

        password_field = driver.find_element(
            "xpath", "//input[@name='password']")
        password_field.send_keys(password)
        password_field.send_keys(Keys.RETURN)
        sleep(6)

        # Making search
        search_input = driver.find_element(
            "xpath", "//input[@aria-label='Search query']")
        search_input.send_keys(f'#{search_query}')
        search_input.send_keys(Keys.RETURN)
        sleep(6)

        # Looking for latest data
        driver.find_element("link text", 'Latest').click()

        data = []
        tweet_ids = set()
        last_position = driver.execute_script("return window.pageYOffset;")
        scrolling = True

        while scrolling and len(data) < 10:
            tweets = driver.find_elements(
                "xpath", "//article[@data-testid='tweet']")
            for tweet in tweets[-15:]:
                tweet_data = get_tweet_data(tweet)
                if tweet_data:
                    tweet_id = ''.join(tweet_data)
                    if tweet_id not in tweet_ids:
                        tweet_ids.add(tweet_id)
                        data.append(tweet_data)
            scroll_attempt = 0
            while True:
                # check scroll position
                driver.execute_script(
                    'window.scrollTo(0, document.body.scrollHeight);')
                sleep(1)
                curr_position = driver.execute_script(
                    "return window.pageYOffset;")
                if last_position == curr_position:
                    scroll_attempt += 1

                    # end of scroll region
                    if scroll_attempt >= 3:
                        scrolling = False
                        break
                    else:
                        sleep(2)
                else:
                    last_position = curr_position
                    break
        driver.quit()
        return data

    except WebDriverException as e:
        logging.error(f"WebDriver error: {e}", exc_info=True)
    finally:
        driver.quit()
