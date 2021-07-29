from flask import Blueprint, jsonify, request
from api.pexel_api import PexelApi


api_views = Blueprint('api_views ', __name__)


@api_views.route('/api/photos/curated', methods=['GET'])
def get_curated_photos():
    page_num = request.args.get('page_num', 1)

    photo_data = PexelApi.fetch_curated_photos(page_num)

    return jsonify(photos=photo_data)


@api_views.route('/api/photos/search', methods=['GET'])
def get_photos_by_query():
    page_num = request.args.get('page_num', 1)
    query = request.args.get('query', "")
    
    photo_data = PexelApi.fetch_photos_by_query(page_num, query)

    return jsonify(photos=photo_data)