import os

DEBUG = True
if os.getenv('DEBUG', 'True').lower() == 'false':
    DEBUG = False

STOPS = [
    {'line_name':'KT', 'stop_id':'17361', 'stop_name':'3rd & Mariposa Inbound'},
    {'line_name':'22', 'stop_id':'16657', 'stop_name':'Tennessee St & 18th St'},
]
# Each dict in STOPS is:
# line_name - id from http://proximobus.appspot.com/agencies/sf-muni/routes.json
# stop_id - id from http://proximobus.appspot.com/agencies/sf-muni/routes/12/stops.json
# stop_name - human readable name of the stop

