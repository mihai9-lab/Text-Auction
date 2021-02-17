# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Reactions(models.Model):
    id = models.BigAutoField(primary_key=True)
    type = models.CharField(max_length=255)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='UserId', blank=True, null=True)  # Field name made lowercase.
    textid = models.ForeignKey('Texts', models.DO_NOTHING, db_column='TextId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'reactions'


class Texts(models.Model):
    id = models.BigAutoField(primary_key=True)
    text = models.TextField()
    price = models.BigIntegerField()
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='UserId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'texts'


class Users(models.Model):
    id = models.BigAutoField(primary_key=True)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    tokens = models.BigIntegerField()
    admin = models.IntegerField()
    last_login = models.DateTimeField(blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

    is_authenticated=True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False
    class Meta:
        managed = False
        db_table = 'users'

