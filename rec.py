import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys

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
index = []
category = []
companyname = []
locationname = []
start_date = []
duration = []
stipend = []
apply_by = []

i = 1

for element in sorted_similar_internships:
    index.append(i)
    category.append(get_title_from_index(element[0]))
    companyname.append(get_name_from_index(element[0]))
    locationname.append(get_location_from_index(element[0]))
    start_date.append(get_date_from_index(element[0]))
    duration.append(get_duration_from_index(element[0]))
    stipend.append(get_stipend_from_index(element[0]))
    apply_by.append(get_apply_from_index(element[0]))

    i=i+1
    if i>5:
        break

df1 = pd.DataFrame({'Index': index, 'Internship Category': category, 'Company name': companyname, 'location': locationname, 'Start Date': start_date, 'Duration': duration, 'Stipend': stipend, 'Apply By': apply_by})
df1.to_csv('client\public\\recommendations.csv', index=False, encoding='utf-8')