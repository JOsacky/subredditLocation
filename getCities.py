#!/usr/bin/env python

from lxml import html
import requests
import re
import csv

newlines = re.compile(r"\s+", re.MULTILINE)
commas = re.compile(",", re.MULTILINE)

page = requests.get('http://www.reddit.com/r/chicago')
tree = html.fromstring(page.text)

page2 = requests.get('http://www.insidervlv.com/citylargestUSA.html')
tree2 = html.fromstring(page2.text)
 
numUsers = tree.xpath('//span[@class="number"]/text()')

cities = tree2.xpath('//tr/td[@width="143"]/font/text()')
population = tree2.xpath('//tr/td[@width="75"]/font/text()')

print cities
print population

print cities 
with open('cities.csv', 'wb') as csvfile:
        csvwriter = csv.writer(csvfile) 
        labels = (["City Name"]);
        csvwriter.writerow(labels)
        for n in range(len(cities)):
			info = (newlines.sub("", cities[n]),newlines.sub("", population[n].replace(",","")))
			print info
			csvwriter.writerow(info)

#print newlines.sub("", cities)
