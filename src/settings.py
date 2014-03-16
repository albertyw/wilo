DEBUG = True
STOPS = [
    {'line_name':'12', 'stop_id':'14657', 'stop_name':'Folsom St & 3rd St'},
    {'line_name':'10', 'stop_id':'13009', 'stop_name':'2nd St & Harrison St'},
    {'line_name':'8X', 'stop_id':'13723', 'stop_name':'Bryan St & 4th St'},
]
# Each dict in STOPS is:
# line_name - id from http://proximobus.appspot.com/agencies/sf-muni/routes.json
# stop_id - id from http://proximobus.appspot.com/agencies/sf-muni/routes/12/stops.json
# stop_name - human readable name of the stop

try:
    from settingslocal import *
except:
    pass
