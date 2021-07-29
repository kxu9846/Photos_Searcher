import os, sys


CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.join(CURRENT_DIR, 'site'))


import flask
from views.public_views import public_views
from views.api_views import api_views


app = flask.Flask(__name__, static_folder='../photo-app/build/static', template_folder='../photo-app/build/')
app.config["DEBUG"] = True

app.register_blueprint(public_views)
app.register_blueprint(api_views)

app.run(host='127.0.0.1', port=8080, threaded=True, debug=True)