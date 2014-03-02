"""
Handling reading/writing data
"""

import requests

def get_routes():
    route_list = 'http://proximobus.appspot.com/agencies/sf-muni/routes.json'
    r = requests.get(route_list)
    return r.json()

def get_times(stop_id):
    stop_time = 'http://proximobus.appspot.com/agencies/sf-muni/stops/%s/predictions.json' % stop_id
    r = requests.get(stop_time)
    stop_times = [int(round(stop['minutes'])) for stop in r.json()['items']]

    # Get all times less than 30 minutes or at least 1 time
    if len(stop_times) > 0:
        min_stop_time = min(stop_times)
    stop_times = [time for time in stop_times if time <= 30]
    if min_stop_time not in stop_times:
        stop_times.append(min_stop_time)
    stop_times.sort()
    return stop_times
