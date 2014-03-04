"""
Transit Status
"""

from flask import Flask, render_template
import json

import settings

app = Flask(__name__)
app.debug = settings.DEBUG

@app.route("/")
def root():
    return render_template('home.html', stops = json.dumps(settings.STOPS))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9001)
