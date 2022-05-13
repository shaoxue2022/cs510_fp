import pandas as pd
import numpy as np
import sklearn
import random
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import BernoulliNB
from sklearn import metrics
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

def get_stopwords():
    stopwords = []
    file1 = open('data/stopwords.txt', 'r')
    Lines = file1.readlines()
    for line in Lines:
        word = line.strip()
        stopwords.append(word)
    return stopwords

def process_train_data(train_data, n_samples = 100000):
    text = 5
    label = 0
    subject = 3
    labels = []
    tweets = []
    subjects = []
    sample = random.sample(range(0, len(train_data) - 1), n_samples)
    for i in sample:
        print(i)
        tweets.append(train_data.iloc[i, text])
        subjects.append(train_data.iloc[i, subject])
        labels.append(train_data.iloc[i, label])
    return tweets, labels, subjects

def pre_process_tweets(tweets, urls = True, hash_tags = False, targets = True, spelling = True):
    processed_tweets = []
    for tweet in tweets:
        words = tweet.split(" ")
        tweet_str = ""
        for word in words:
            if urls and (word.startswith("https") or word.startswith("http")):
                continue
            elif hash_tags and word.startswith("#"):
                continue
            elif targets and word.startswith("@"):
                continue
            tweet_str += word + " "
        tweet_str = tweet_str[:-1]
        processed_tweets.append(tweet_str)

    return processed_tweets

def get_word_feature_vectors(document, stopwords, max_features = 1000, ngram_range = (1,1)):
    count_vectorizer = CountVectorizer(stop_words = stopwords, max_features = max_features, ngram_range = (1,3))
    feature_vector = count_vectorizer.fit(document)

    train_ds_features =  count_vectorizer.transform(document)
    features = feature_vector.get_feature_names()
    features_counts = np.sum(train_ds_features.toarray(), axis = 0)
    features_counts = pd.DataFrame(dict(features =  features, counts = features_counts))

    return train_ds_features, features_counts

def train_and_save_classifier(train_ds_features, labels, filename):
    train_x, test_x, train_y, test_y = train_test_split(train_ds_features, labels, 
                                                     test_size = 0.3, random_state = 42)
    model = BernoulliNB()
    model.fit(train_x.toarray(), train_y)
    #pickle.dump(model, open(filename, 'wb'))
    
    test_ds_predicted = model.predict(test_x.toarray()) 
    accuracy = round(accuracy_score(test_y,  test_ds_predicted), 4)    
    print(accuracy)                                        

def main():
    train_data = pd.read_csv('data/large.csv', encoding='latin-1')
    
    tweets, labels, subjects = process_train_data(train_data, n_samples=50000)
    document = pre_process_tweets(tweets)
    train_ds_features, features_counts = get_word_feature_vectors(document, get_stopwords(), max_features=2500)

    train_and_save_classifier(train_ds_features, labels, "mode/model.sav")  


if __name__=="__main__":
    main()         