import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys
from pymongo import MongoClient

client = MongoClient("mongodb+srv://rebecca:1234@projectdata.obanm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client.get_database('myFirstDatabase')
records = db.recommendations

print('First param:'+sys.argv[1]+'#')

df = pd.read_csv("Internships.csv",encoding='cp1252')

features = ['Keywords']

def combine_features(row):
    return row['Keywords']

for feature in features:
    df[feature] = df[feature].fillna('') #filling all NaNs with blank string

df["combined_features"] = df.apply(combine_features,axis=1) #applying combined_features() method over each rows of dataframe and storing the combined string i

df.iloc[0].combined_features

cv = CountVectorizer() #creating new CountVectorizer() object
count_matrix = cv.fit_transform(df["combined_features"]) #feeding combined strings(internship contents) to CountVectorizer() object

cosine_sim = cosine_similarity(count_matrix)

def get_title_from_index(index):
    return df[df.index == index]["Internship_Category"].values[0]
def get_name_from_index(index):
    return df[df.index == index]["Company_name"].values[0]
def get_location_from_index(index):
    return df[df.index == index]["location"].values[0]
def get_date_from_index(index):
    return df[df.index == index]["Start_Date"].values[0]
def get_duration_from_index(index):
    return df[df.index == index]["Duration"].values[0]
def get_stipend_from_index(index):
    return df[df.index == index]["Stipend"].values[0]
def get_apply_from_index(index):
    return df[df.index == index]["Apply_By"].values[0]
def get_index_from_title(Internship_Category):
    return df[df.Internship_Category == Internship_Category]["index"].values[0]

internship_user_likes = sys.argv[1]
internship_index = get_index_from_title(internship_user_likes)

similar_internship = list(enumerate(cosine_sim[internship_index])) #accessing the row corresponding to given movie to find all the similarity scores for that 

sorted_similar_internships = sorted(similar_internship,key=lambda x:x[1],reverse=True)[1:]

i=0
print("Top 5 similar internships to "+internship_user_likes+" are:\n")

df1 = pd.DataFrame()
category = []
companyname = []
locationname = []
start_date = []
duration = []
stipend = []
apply_by = []

i = 1

for element in sorted_similar_internships:
    new_recommendation = {
        'Internship_Category': get_title_from_index(element[0]),
        'Company_name' : get_name_from_index(element[0]),
        'location' : get_location_from_index(element[0]),
        'Start_Date' : get_date_from_index(element[0]),
        'Duration' : get_duration_from_index(element[0]),
        'Stipend' : get_stipend_from_index(element[0]),
        'Apply_By' : get_apply_from_index(element[0])
    }
    
    records.insert_one(new_recommendation)

    i=i+1
    if i>5:
        break