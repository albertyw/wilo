"""
Transit Status
"""

from flask import Flask, render_template, jsonify
from uber_rides.auth import AuthorizationCodeGrant

import settings

app = Flask(__name__)
app.debug = settings.DEBUG


@app.route("/")
def root():
    wifi = {'WIFI_NAME': settings.WIFI_NAME, 'WIFI_PASSWORD': settings.WIFI_PASSWORD}
    return render_template('home.html', wifi=wifi)


@app.route("request_uber")
def request_uber():
    return jsonify([])


def make_request():
    auth_flow = AuthorizationCodeGrant(
        settings.UBER_CLIENT_ID,
        ['profile', 'request'],
        settings.UBER_CLIENT_SECRET,
        settings.UBER_REDIRECT_URL,
    )
    auth_flow.get_session('https://albertyw.com/?code='+settings.UBER_PERSONAL_ACCESS_TOKEN)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9001)
