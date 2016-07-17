import os

DEBUG = True
if os.getenv('DEBUG', 'True').lower() == 'false':
    DEBUG = False

WIFI_NAME = os.getenv('WIFI_NAME', '')
WIFI_PASSWORD = os.getenv('WIFI_PASSWORD', '')
