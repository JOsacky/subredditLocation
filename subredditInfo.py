#!/usr/bin/env python

from lxml import html
import requests
import csv

with open('uscities.csv', 'rb') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
                cityName = row[11]
	        page = requests.get('http://www.reddit.com/r/' + cityName)
	        tree = html.fromstring(page.text)
                subscribers = tree.xpath('//span[@class="number"]/text()')
                if len(subscribers) > 0 :
	          print subscribers[0]
                else:
                  print '0'
