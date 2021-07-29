import os


PEXEL_API_KEY = ""

CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))

with open(CURRENT_DIR + "/pexel_key.txt", 'r') as f:
    PEXEL_API_KEY = f.read()

