import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import datetime

player_name_dict = {
    "tatum" : "Jayson_Tatum",
    "giannis" : "Giannis_Antetokounmpo",
    "steph curry" : "Stephen_Curry",
    "durant" : "Kevin_Durant",
    "lebron" : "Lebron_James",
    "jokic" : "Nikola_Jokic",
    "luka" : "Luka_Doncic",
    "james harden" : "James_Harden",
    "lillard" : "Damian_Lillard",
    "embiid" : "Joel_Embiid",
    "kawhi" : "Kawhi_Leonard",
    "anthony davis" : "Anthony_Davis",
    "jimmy butler" : "Jimmy_Butler",
    "paul george" : "Paul_George",
    "kyrie" : "Kyrie_Irving",
    "zion williamson" : "Zion_Williamson",
    "bradley beal" : "Bradley_Beal",
    "trae young" : "Trae_Young",
    "donovan mitchell" : "Donovan_Mitchell",
    "chris paul" : "Chris_Paul"
}

sentiment_data = pd.read_csv('data/short_player_sentiment.csv', encoding='latin-1')
player_names = sentiment_data['Player'].unique()
for player in player_names:
    sorted_by_date = sentiment_data[sentiment_data['Player'] == player].sort_values(by = "Time")
    dates = sorted_by_date[sorted_by_date['Player'] == player]['Time'].values
    sentiments = sorted_by_date[sorted_by_date['Player'] == player]['Positive %']
    days = []
    for date in dates:
        day = date.split("-")
        year = int(day[0])
        month = int(day[1]) 
        day_ = int(day[2]) 
        days.append(datetime.datetime(year, month, day_))

    real_name = player_name_dict[player]
    first_name, last_name = real_name.split("_")
    plt.figure()
    plt.style.use("dark_background")
    plt.plot(days, sentiments)
    if (len(first_name) + len(last_name) > 16):
        plt.title(first_name + " " + last_name + "\n Sentiment Over Time", fontsize = 20)
    else:
        plt.title(first_name + " " + last_name + " Sentiment Over Time", fontsize = 20)
    plt.xlabel('Date', fontsize = 16)
    plt.ylabel('Positive %', fontsize = 16)
    plt.xticks(fontsize=13, rotation = 30)
    plt.tight_layout()
    plt.yticks(fontsize=13)
    plt.savefig('graphs/' + player_name_dict[player] + '.png')

plt.show()