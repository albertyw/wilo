"""
Transit Status
This file handles the serving of data
"""

from flask import Flask, render_template

import settings
import data

app = Flask(__name__)
app.debug = settings.DEBUG

@app.route("/")
def root():
    d = data.get_routes()
    stops = []
    for stop in settings.STOPS:
        stop['time'] = data.get_time(stop['stop_id'])
        stops.append(stop)
    return render_template('home.html', stops = stops)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9001)
