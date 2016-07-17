"""
Transit Status
"""

from flask import Flask, render_template

import settings

app = Flask(__name__)
app.debug = settings.DEBUG

@app.route("/")
def root():
    wifi = {'WIFI_NAME': settings.WIFI_NAME, 'WIFI_PASSWORD': settings.WIFI_PASSWORD}
    return render_template('home.html', wifi=wifi)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9001)
