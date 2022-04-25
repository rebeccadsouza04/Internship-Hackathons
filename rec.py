import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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
def get_index_from_title(Internship_Category):
    return df[df.Internship_Category == Internship_Category]["index"].values[0]

internship_user_likes = "Graphic Design"
internship_index = get_index_from_title(internship_user_likes)
print(internship_index)
similar_internship = list(enumerate(cosine_sim[internship_index])) #accessing the row corresponding to given movie to find all the similarity scores for that 

sorted_similar_internships = sorted(similar_internship,key=lambda x:x[1],reverse=True)[1:]

i=0
print("Top 5 similar internships to "+internship_user_likes+" are:\n")

for element in sorted_similar_internships:
    print(get_title_from_index(element[0]))
    i=i+1
    if i>5:
        break