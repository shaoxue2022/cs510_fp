import pandas as pd
import numpy as np
import sklearn
import random
import pickle
from train_classifier import get_stopwords, pre_process_tweets, get_word_feature_vectors

def compute_player_sentiment(predicted_labels, players):
    player_predictions = {}
    for i in range(len(players)):
        player = players[i]
        if player not in player_predictions:
            player_predictions[player] = [0, 0]
        if predicted_labels[i] == 4:
            player_predictions[player][0] += 1
        else:
            player_predictions[player][1] += 1
    return player_predictions

def store_player_sentiment(new, player_predictions, date, file_name):
    data = []
    if new:
        for player in player_predictions.keys():
            player_row = []
            player_row.append(player)
            player_row.append(date)
            player_row.append(player_predictions[player][0])
            player_row.append(player_predictions[player][1])
            data.append(player_row)
            df = pd.DataFrame(data, columns = ["Player", "Time", "Positive %", "Negative %"])
            df.to_csv(file_name)
            print(df)
    else:
        with open(file_name,'a') as fd:
            for player in player_predictions.keys():
                player_row = []
                player_row.append(player)
                player_row.append(date)
                player_row.append(player_predictions[player][0])
                player_row.append(player_predictions[player][1])
                string = "0," + player_row[0] + "," + player_row[1] + "," + str(player_row[2]) + "," + str(player_row[3])
                print(string)
                fd.write(string) 
                fd.write('\n')

def main():
    data = pd.read_csv("data/short_player_tweets.csv", encoding='latin-1')
    tweets = list(data.iloc[:, 3])
    players = list(data.iloc[:, 1])
    date = data.iloc[0, 2]
    
    document = pre_process_tweets(tweets, hash_tags=True)
    train_ds_features, features_counts = get_word_feature_vectors(document, get_stopwords(), max_features=1000)

    loaded_model = pickle.load(open("model/model.sav", 'rb'))
    predicted_labels = loaded_model.predict(train_ds_features.toarray())

    player_predictions = compute_player_sentiment(predicted_labels, players)
    store_player_sentiment(False, player_predictions, date, "data/short_player_sentiment.csv")

if __name__=="__main__":
    main()