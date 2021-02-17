from django.contrib import auth
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login

# Create your views here.
from .forms import LoginForm


def index(req):
    if req.method == 'POST':
        form = LoginForm(req.POST)
        if form.is_valid():

            user = authenticate(req, username=form.cleaned_data.get(
                'email'), password=form.cleaned_data.get('password'))
            if user is not None:
                login(req, user)
                return redirect('auction:index')
    else:
        form = LoginForm()
    return render(req, 'auction/index.html', {'form': form})
