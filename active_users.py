from lxml import html
import requests
import time
import csv
from StringIO import StringIO
import re

base_url = 'http://www.reddit.com/r/'

def get_num_users(subreddit):
    url = base_url + subreddit
    page = requests.get(url).text

    text_io = StringIO(page)
    tree =  html.parse(text_io)

    active_users = '0'
    try:
        active_users = tree.xpath('//p[@title="logged-in users viewing this subreddit in the past 15 minutes"]/span[@class="number"]/text()')[0]
    except:
        "something went wrong with " + url

    regex = re.compile('\d+')
    match = regex.search(active_users)
    if match:
        print match.group()
        return match.group()
    else:
        return '0'
    

def subreddits():
    reddit_names = []
    with open('web/uscities.csv','r') as csvfile:
        cities_reader = csv.reader(csvfile, delimiter=',')
        for row in cities_reader:
            name = row[11]
            print name
            reddit_names.append(name)
        return reddit_names

def generate_file():
    reddits = subreddits()
    with open('numusers.csv', 'wb') as csvfile:
        labels = (["Subreddit Name", "Users Online"])
        writer = csv.writer(csvfile)
        writer.writerow(labels)
        for subreddit in reddits:
            numusers = get_num_users(subreddit)
            info = (subreddit, numusers)
            writer.writerow(info)
            print info

generate_file()