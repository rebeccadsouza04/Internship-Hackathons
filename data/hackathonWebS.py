from bs4 import BeautifulSoup
from numpy import append
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

import pandas as pd
from csv import writer


PATH ="D:\Rebecca College\SEM 6\Internship-Hackathons\data\chromedriver.exe"

driver = webdriver.Chrome(PATH)

driver.get("https://www.hackerearth.com/challenges/hackathon/")

df = pd.DataFrame()

try :
    element = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "challenge-container")))
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'lxml')
    challenge_container = soup.select("#challenge-container")
    ongoing=challenge_container[0].select(".ongoing")
    #csv ds
    titles=[]
    status =[]
    participating=[]
    start_date = []
    ends_date=[]
    Mode=[]
    ahrefs=[]




    ##ongoing challenges
    ongoin_challenge_divs = ongoing[0].select(".challenge-card-modern")
    i=0
    print("########ONGOING HACKATHONS#########")
    for challenge in ongoin_challenge_divs:
        print(f"=================================={i}=======================")
        title = challenge.find('span',class_='challenge-list-title').get_text(" ",strip=True)
        
        users_participating = challenge.find('div',class_='registrations-container').get_text(" ",strip=True)
       
        link = challenge.find('a',class_='challenge-card-link')['href']

##ADD THE FOLLOWING PRINT STATEMENTS TO .CSV
        status.append("ongoing")
        print(title)
        titles.append(title)
        print(users_participating)
        participating.append(users_participating)
        print(link)
        ahrefs.append(link)
        driver.get(link)                
        
        try:            
            link_page_events_details = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "event-details-container")))
            new_page_source = driver.page_source
            link_soup = BeautifulSoup(new_page_source, 'lxml')
            event_details = link_soup.select(".event-details-container")

            starts_on = event_details[0].find('div',class_='start-time-block').get_text(" ",strip=True)
            mode = event_details[0].find('div',class_='location-block').find('div',class_='regular bold desc dark').get_text(" ",strip=True)
            ends_on = event_details[0].find('div',class_='end-time-block').find('div',class_='regular bold desc dark').get_text(" ",strip=True)
## ADD THE FOLLOWING PRINT STATEMENTS TO .CSV
            print(starts_on)
            start_date.append(starts_on[10:])
            print("MODE: "+mode)
            Mode.append(mode)
            print("ENDS ON: "+ ends_on)
            ends_date.append(ends_on)
        except:
            print("opps!!!")


        

        i+=1
        # time.sleep(10)
        driver.back()



    ###### Upcomming 
    print()
    print()
    print("########UPCOMING HACKATHONS#########")
    i=0
    upcoming = challenge_container[0].select(".upcoming")
    upcoming_challenge_divs =upcoming[0].select(".challenge-card-modern")
    for challenge in upcoming_challenge_divs:
        print(f"=================================={i}=======================")
        title = challenge.find('span',class_='challenge-list-title').get_text(" ",strip=True)
       
        users_participating = challenge.find('div',class_='registrations-container').get_text(" ",strip=True)
        print(users_participating)

        starts_on = challenge.find('div',class_='date').get_text(" ",strip=True)
        

        link = challenge.find('a',class_='challenge-card-link')['href']
        

## ADD THE FOLLOWING PRINT STATEMENTS TO .CSV  
        status.append("upcoming")
        print(title)
        titles.append(title)

        participating.append(users_participating)

        # print(starts_on)
        print(link)
        ahrefs.append(link)

        driver.get(link)    
        try:            
            element1 = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "sprint-body")))
            new_page_source = driver.page_source
            link_soup = BeautifulSoup(new_page_source, 'lxml')
            event_details = link_soup.select(".event-details-container")
            starts_on = event_details[0].find('div',class_='start-time-block').get_text(" ",strip=True)
            mode = event_details[0].find('div',class_='location-block').find('div',class_='regular').get_text(" ",strip=True)
            ends_on = event_details[0].find('div',class_='end-time-block').find('div',class_='regular').get_text(" ",strip=True)

## ADD THE FOLLOWING PRINT STATEMENTS TO .CSV 
            print(starts_on)
            start_date.append(starts_on[10:])
            print("MODE: "+mode)
            Mode.append(mode)
            print("ENDS ON: "+ends_on)
            ends_date.append(ends_on)

        except:
            print("opps!!!")
        

        i+=1
        # time.sleep(10)
        driver.back()
    


    df1= pd.DataFrame({'Title':titles,'Status':status,'Start Date':start_date,'End Date':ends_date,'Participants No':participating,'Mode':Mode,'Hrefs':ahrefs})
    df=df.append(df1)
    df.to_csv('Hackathon.csv', index=False, encoding='utf-8')
except :
    print("Loading took too much time!")


# time.sleep(10)
driver.quit()

