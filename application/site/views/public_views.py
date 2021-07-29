import json

from flask import render_template, Blueprint
from api.pexel_api import PexelApi


public_views = Blueprint('public_views ', __name__)


@public_views.route('/', methods=['GET'])
def home():
    initial_photo_data = PexelApi.fetch_curated_photos(page_num=1)
    initial_photo_json = json.dumps(initial_photo_data)

    return render_template('index.html', photos=initial_photo_json)