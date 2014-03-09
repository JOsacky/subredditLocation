#!/usr/bin/env python

from lxml import html
import requests

page = requests.get('http://www.reddit.com/r/chicago')
tree = html.fromstring(page.text)

page2 = requests.get('http://www.insidervlv.com/citylargestUSA.html')
tree2 = html.fromstring(page2.text)
 
numUsers = tree.xpath('//span[@class="number"]/text()')

cities = tree2.xpath('//tr/td[@width="143"]/font/text()')

for city in cities:
	cityName = city.lstrip().replace(" ", "").replace(".","").replace("-", "")
	page = requests.get('http://www.reddit.com/r/' + cityName)
	tree = html.fromstring(page.text)
	print city + str(tree.xpath('//span[@class="number"]/text()'))
