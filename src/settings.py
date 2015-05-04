import os

DEBUG = True
if os.getenv('DEBUG', 'True').lower() == 'false':
    DEBUG = False

WIFI_NAME = os.getenv('WIFI_NAME', '')
WIFI_PASSWORD = os.getenv('WIFI_PASSWORD', '')

STOPS = [
    {'line_name':'KT', 'stop_id':'17356', 'stop_name':'3rd & Mariposa Towards Downtown', 'times': []},
    {'line_name':'KT', 'stop_id':'17361', 'stop_name':'3rd & Mariposa Southbound', 'times': []},
    {'line_name':'22', 'stop_id':'16657', 'stop_name':'Tennessee St & 18th St', 'times': []},
]
# Each dict in STOPS is:
# line_name - id from http://proximobus.appspot.com/agencies/sf-muni/routes.json
# stop_id - id from http://proximobus.appspot.com/agencies/sf-muni/routes/12/stops.json
# stop_name - human readable name of the stop

