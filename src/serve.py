"""
Transit Status
"""

from flask import Flask, render_template
import json

import mlb_schedule
import settings

app = Flask(__name__)
app.debug = settings.DEBUG

@app.route("/")
def root():
    wifi = {'WIFI_NAME': settings.WIFI_NAME, 'WIFI_PASSWORD': settings.WIFI_PASSWORD}
    return render_template('home.html', stops = json.dumps(settings.STOPS), wifi=wifi)

@app.route("/giants_schedule")
def giants_schedule():
    return json.dumps(mlb_schedule.get_todays_game())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9001)
