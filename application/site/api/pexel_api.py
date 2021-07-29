import requests
from keys.secrets import PEXEL_API_KEY


class PexelApi(object):
    BASE_URL = "https://api.pexels.com"
    VERSION = "v1"
    MAX_PHOTO_RESULTS = 10

    @classmethod
    def get_pexel_headers(cls):
        return {'Authorization': PEXEL_API_KEY}
    
    @classmethod
    def get_pexel_api_url(cls, endpoint):
        return '/'.join((cls.BASE_URL, cls.VERSION, endpoint))

    @classmethod
    def get_pexel_default_params(cls, page_num):
        return {
            'page': int(page_num),
            'per_page': cls.MAX_PHOTO_RESULTS,
        }

    @classmethod
    def get_photos_from_response(cls, response):
        data = response.json()
        photos = data['photos']

        total_pages = data['total_results']/ data['per_page']

        return {
            'photo_info': [{
            'url': photo['src']['medium'],
            'photographer': photo['photographer'],
            } for photo in photos],
            'total_pages': total_pages
        }

    @classmethod
    def fetch_curated_photos(cls, page_num):
        curated_photos_url = cls.get_pexel_api_url('curated')
        pexel_headers = cls.get_pexel_headers()
        pexel_params = cls.get_pexel_default_params(page_num)

        response = requests.get(url=curated_photos_url, headers=pexel_headers, params=pexel_params)
        response.raise_for_status()

        return cls.get_photos_from_response(response)

    @classmethod
    def fetch_photos_by_query(cls, page_num, query):
        curated_photos_url = cls.get_pexel_api_url('search')
        pexel_headers = cls.get_pexel_headers()
        pexel_params = cls.get_pexel_default_params(page_num)
        pexel_params['query'] = query

        response = requests.get(url=curated_photos_url, headers=pexel_headers, params=pexel_params)
        response.raise_for_status()

        return cls.get_photos_from_response(response)

