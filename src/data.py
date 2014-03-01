"""
Handling reading/writing data
"""

import requests

def get_routes():
    route_list = 'http://proximobus.appspot.com/agencies/sf-muni/routes.json'
    r = requests.get(route_list)
    return r.json()

def get_time(stop_id):
    stop_time = 'http://proximobus.appspot.com/agencies/sf-muni/stops/%s/predictions.json' % stop_id
    r = requests.get(stop_time)
    return r.json()
