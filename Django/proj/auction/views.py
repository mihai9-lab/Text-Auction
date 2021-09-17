from .models import Reactions, Texts, Users
from django.contrib import auth
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

# Create your views here.
from .forms import AuctionTextForm, LoginForm


def index(req):
    if req.user.is_authenticated:
        return redirect('auction:home')
    else:
        if req.method == 'POST':
            form = LoginForm(req.POST)
            if form.is_valid():
                user = authenticate(req, username=form.cleaned_data.get(
                    'email'), password=form.cleaned_data.get('password'))
                if user is not None:
                    login(req, user)
                    return redirect('auction:home')
        else:
            form = LoginForm()
        return render(req, 'auction/index.html', {'form': form})


@login_required
def home(req):
    users = Users.objects.all()
    texts = Texts.objects.all()
    reactions = Reactions.objects.all()
    total_texts_count = len(texts)
    bought_texts = texts.exclude(userid=None)
    bought_texts_count = len(bought_texts)
    total_tokens = 0
    total_tokens_held = 0
    for user in users:
        total_tokens += user.tokens
        total_tokens_held += user.tokens
    for text in bought_texts:
        total_tokens += text.price

    tableData = []
    for text in bought_texts:
        r = reactions.filter(textid=text.id)
        earned = 0
        for reaction in r:
            if reaction.type == 'like' or reaction.type == 'dislike':
                earned += 100
            else:
                earned += 200
        tableData.append(
            {'textId': text.id,
             'userName': text.userid.name,
             'userEmail': text.userid.email,
             'price': text.price,
             'reactions': len(r),
             'earned': earned,
             'profit': earned-text.price})
    return render(req, 'auction/home.html', {
        'total_texts': total_texts_count,
        'bought_texts': bought_texts_count,
        'auctioned_texts': total_texts_count - bought_texts_count,
        'total_tokens': total_tokens,
        'total_tokens_held': total_tokens_held,
        'total_tokens_spent': total_tokens - total_tokens_held,
        'data': tableData
    })


@login_required
def create_auction_text(req):
    if req.method == 'POST':
        form = AuctionTextForm(req.POST)
        if form.is_valid():
            text = Texts(text=form.cleaned_data.get('text'),
                         price=form.cleaned_data.get('price'))
            text.save()
            return redirect('auction:home')
    else:
        form = AuctionTextForm()
    return render(req, 'auction/auction_text.html', {'form': form})
