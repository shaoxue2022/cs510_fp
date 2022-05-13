import pandas as pd
import numpy as np
import sklearn
import random
import pickle
import datetime
from datetime import date
from train_classifier import get_stopwords, pre_process_tweets, get_word_feature_vectors
import csv 
import json

def get_curr_sentiment(sentiment_list):
    for sentiment in sentiment_list:
        day, positive = sentiment
        day = day.split("-")
        year = int(day[0])
        month = int(day[1]) 
        day_ = int(day[2]) 
        d1 = datetime.datetime(year, month, day_)
        if d1.date() == datetime.datetime.now().date():
            return int(positive)

def get_timetable_sentiment(sentiment_list, days_ago):
    todays_date = date.today()
    date_ago = todays_date - datetime.timedelta(days=days_ago)
    num_days = 0
    cummulative_sentiment = 0
    for sentiment in sentiment_list:
        day, positive = sentiment
        day = day.split("-")
        year = int(day[0])
        month = int(day[1]) 
        day_ = int(day[2]) 
        d1 = datetime.datetime(year, month, day_)
        if d1.date() >= date_ago:
            num_days += 1
            cummulative_sentiment += int(positive)
    return round(cummulative_sentiment / num_days, 2)

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []

    player_dict = {}
      
    with open(csvFilePath, encoding='utf-8') as csvf: 
        csvReader = csv.DictReader(csvf) 

        for row in csvReader: 
            player_name = row['Player']
            if player_name not in player_dict:
                player_dict[player_name] = []
            sentiment = (row['Time'], row['Positive %'])
            player_dict[player_name].append(sentiment)
        
        for player in player_dict.keys():
            player_row = {
                'Player' : player, 
                'cur_Pos%' : get_timetable_sentiment(player_dict[player], days_ago=0),
                '1wk_Pos%' : get_timetable_sentiment(player_dict[player], days_ago=7),
                '2wk_Pos%' : get_timetable_sentiment(player_dict[player], days_ago=14),
                '1mth_Pos%' : get_timetable_sentiment(player_dict[player], days_ago=31),
                '2mth_Pos%' : get_timetable_sentiment(player_dict[player], days_ago=61),
                'full_Pos%' : get_timetable_sentiment(player_dict[player], days_ago=213)
                            }
            print(player_row)
            jsonArray.append(player_row)

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)
          
csvFilePath = 'data/short_player_sentiment.csv'
jsonFilePath = 'player_sentiment.json'
csv_to_json(csvFilePath, jsonFilePath)
