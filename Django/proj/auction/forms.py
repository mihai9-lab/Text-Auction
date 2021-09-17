from django.db.models import fields
from .models import Texts
from django import forms


# class RegisterForm(UserCreationForm):
#     first_name = forms.CharField(max_length=50, required=True)
#     last_name = forms.CharField(max_length=50, required=True)
#     email = forms.EmailField(max_length=100)

#     class Meta:
#         model = User
#         fields = ('username', 'first_name', 'last_name',
#                   'email', 'password1', 'password2')


# class NoteForm(forms.ModelForm):
#     class Meta:
#         model = Note
#         fields = ['name', 'content', 'colorText',
#                   'colorBackground', 'fontSize']
#         widgets = {
#             'colorText': forms.TextInput(attrs={'type': 'color'}),
#             'colorBackground': forms.TextInput(attrs={'type': 'color'})
#         }


class LoginForm(forms.Form):
    email = forms.EmailField(label='Email', required=True)
    password = forms.CharField(widget=forms.PasswordInput(), required=True)


class AuctionTextForm(forms.ModelForm):
    class Meta:
        model = Texts
        fields = ['text', 'price']
