import pandas as pd
import numpy as np
import tweepy as tw
from datetime import datetime

def get_player_tweets(player_name):
    my_api_key = "jHVNcDncgFy0vuvkAa56oS86k"
    my_api_secret = "dTNWWbpU1QYdHpWoibArikos6hwa8sgbYxaKejFsqH3fYi86XX"
    # authenticate
    auth = tw.OAuthHandler(my_api_key, my_api_secret)
    client = tw.Client(bearer_token='AAAAAAAAAAAAAAAAAAAAABk0bAEAAAAAYLli2FK%2BXz%2FcmcflwFDHUwcsBfM%3DLXv8U4T8tD2vZbYJZQDas5SGMzIUdPEMhovVzj3ewuaH4viyLe')

    search_query = player_name + " -is:retweet"

    # get tweets from the API
    tweets = client.search_recent_tweets(query=search_query, tweet_fields=['context_annotations', 'created_at'], max_results=100)

    # store the API responses in a list
    tweets_copy = []
    for tweet in tweets[0]:
        tweets_copy.append(tweet)

    return tweets_copy

def store_player_tweets(player_name_list, file_name, date):
    now = date
    data = []
    for player_name in player_name_list:
        player_tweets = get_player_tweets(player_name)
        for tweet in player_tweets:
            tweet_row = []
            tweet_row.append(player_name)
            tweet_row.append(now)
            tweet_row.append(tweet.text)
            data.append(tweet_row)
        
    df = pd.DataFrame(data, columns = ["Player", "Time", "Tweet"])
    df.to_csv(file_name)
    print(df)

def get_player_list(file_name):
    players = []
    file1 = open(file_name, 'r')
    Lines = file1.readlines()
    for line in Lines:
        word = line.strip()
        players.append(word)
    return players


def main():
    player_list = get_player_list("data/short_list.txt")
    store_player_tweets(player_list, "data/short_player_tweets.csv", date = "2022-05-20")

if __name__=="__main__":
    main()    