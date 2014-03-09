import json
import requests


def lookup(query):
    """
    @return tuple of (lon, lad)
    """
    url = 'http://dev.virtualearth.net/REST/v1/Locations?'

    params = dict(
        q=query,
        o='json',
        key='ApxlK7BfB3w_hszoxYy7Oc_cSXbyQa1jxgYHW09LbS7BhWfwxNOziaLmDS9JyoUB'
    )

    resp = requests.get(url=url, params=params)
    print resp.url
    data = json.loads(resp.content)

    total = data['resourceSets'][0]['estimatedTotal']
    if(total < 0):
        print "Nothing found :("
        exit()

    results = data['resourceSets'][0]['resources']
    coordinates = results[0]['geocodePoints'][0]['coordinates']
    point = (float(coordinates[0]),float(coordinates[1]))
    print point
    return point

lookup("New York")