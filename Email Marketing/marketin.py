from pymongo import MongoClient
from bson.objectid import ObjectId
import urllib.parse
import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText

client = MongoClient("mongodb+srv://rebecca:1234@projectdata.obanm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client['myFirstDatabase']

pref = 'Machine Learning'

# Create a new collection
collection = db["profiles"]

item = collection.find({ 'preference1' : pref })
l = []
for i in item:
    l.append(i['user'])

collection = db["users"]

emails = []
names = []

for i in range(0, len(l)):
    item = list(collection.find({ '_id' : ObjectId(l[i]) }))
    temp = item[0]
    emails.append(temp['email'])
    names.append(temp['name'])

collection = db["profiles"]

item = collection.find({ 'preference2' : pref })
l = []
for i in item:
    l.append(i['user'])

collection = db["users"]

for i in range(0, len(l)):
    item = list(collection.find({ '_id' : ObjectId(l[i]) }))
    temp = item[0]
    emails.append(temp['email'])
    names.append(temp['name'])

collection = db["profiles"]

item = collection.find({ 'preference3' : pref })
l = []
for i in item:
    l.append(i['user'])

collection = db["users"]

for i in range(0, len(l)):
    item = list(collection.find({ '_id' : ObjectId(l[i]) }))
    temp = item[0]
    emails.append(temp['email'])
    names.append(temp['name'])

emails = list(set(emails))
names = list(set(names))
print(emails, names)

j = 0

for i in emails:
    body="Hello " + names[j] + "\n A new internship on " + pref + " has been added. Please check our website for further details. Follow us for more updates. \n-InternSFIT"
    msg=MIMEText(body)
    fromaddr="beccaaurelia@gmail.com"
    msg['From']=fromaddr
    msg['To']=i
    msg['Subject']="New internship added on " + pref
    serv=smtplib.SMTP('smtp.gmail.com',587)
    serv.starttls()
    serv.login(fromaddr,"flyphxenuxjvmzcd")
    serv.send_message(msg)
    serv.quit()
    j += 1

print("mail sent")