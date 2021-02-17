from django.contrib.auth.backends import BaseBackend
from auction.models import Users
import requests


class CustomAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        payload = {'email': username, 'password': password,
                   'secret': 'sdh34591mdfsafha0o10m5463nkig01dasm235'}
        resp = requests.post(
            'http://localhost:3000/api/public/auth/django', payload)
        if resp.status_code != 200:
            return None
        else:
            return self.get_user(resp.json()['id'])

    def get_user(self, user_id):
        try:
            return Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            return None
