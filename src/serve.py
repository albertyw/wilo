"""
Transit Status
This file handles the serving of data
"""

from flask import Flask, render_template
import json

import settings
import data

app = Flask(__name__)
app.debug = settings.DEBUG

@app.route("/")
def root():
    return render_template('home.html', stops = json.dumps(settings.STOPS))

@app.route("/data/times.json")
def get_update():
    stops = []
    for stop in settings.STOPS:
        stop['times'] = data.get_times(stop['stop_id'])
        stops.append(stop)
    return json.dumps(stops)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9001)
