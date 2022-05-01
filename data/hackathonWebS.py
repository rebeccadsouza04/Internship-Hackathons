from bs4 import BeautifulSoup
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
PATH ="D:\Sem 6\Mini project\webscrapping\chromedriver.exe"
driver = webdriver.Chrome(PATH)
driver.get("https://www.hackerearth.com/challenges/hackathon/")


try :
    element = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "challenge-container")))
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'lxml')
    challenge_container = soup.select("#challenge-container")
    ongoing=challenge_container[0].select(".ongoing")
    # print(challenge_container)
    ##ongoing challenges
    ongoin_challenge_divs = ongoing[0].select(".challenge-card-modern")
    i=0
    for challenge in ongoin_challenge_divs:
        print(f"=================================={i}=======================")
        title = challenge.find('span',class_='challenge-list-title').get_text(" ",strip=True)
        print(title)
        users_participating = challenge.find('div',class_='registrations-container').get_text(" ",strip=True)
        print(users_participating)
        link = challenge.find('a',class_='challenge-card-link')['href']
        print(link)
        
                
        
        # try:
        #     driver.get(link)
        #     link_page_events_details = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "overview")))
        #     new_page_source = driver.page_source
        #     link_soup = BeautifulSoup(new_page_source, 'lxml')
        #     event_details = soup.select("event-details-container")

        #     starts_on = event_details[0].find('div',class_='start-time-block').get_text(" ",strip=True)
        #     mode = event_details[0].find('div',class_='location-block').find('div',class_='regular bold desc dark').get_text(" ",strip=True)
        #     ends_on = event_details[0].find('div',class_='end-time-block').find('div',class_='regular bold desc dark').get_text(" ",strip=True)

        #     print(starts_on)
        #     print(mode)
        #     print(ends_on)

        # except:
        #     print("opps!!!")


        

        
        # time.sleep(10)
        # driver.back()
        i+=1
        if(i==5):
            break
    ###### Upcomming 
    print()
    print()
    print("########UPCOMING#########")
    i=0
    upcoming = challenge_container[0].select(".upcoming")
    upcoming_challenge_divs =upcoming[0].select(".challenge-card-modern")
    for challenge in upcoming_challenge_divs:
        print(f"=================================={i}=======================")
        title = challenge.find('span',class_='challenge-list-title').get_text(" ",strip=True)
        print(title)
        users_participating = challenge.find('div',class_='registrations-container').get_text(" ",strip=True)
        print(users_participating)

        starts_on = challenge.find('div',class_='date').get_text(" ",strip=True)
        print(starts_on)

        link = challenge.find('a',class_='challenge-card-link')['href']
        print(link)

        try:
            driver.get(link)
            link_page_events_details = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "sprint-body")))
            new_page_source = driver.page_source
            link_soup = BeautifulSoup(new_page_source, 'lxml')
            event_details = soup.select("event-details-container")

            starts_on = event_details[0].find('div',class_='start-time-block').get_text(" ",strip=True)
            mode = event_details[0].find('div',class_='location-block').find('div',class_='regular').get_text(" ",strip=True)
            ends_on = event_details[0].find('div',class_='end-time-block').find('div',class_='regular').get_text(" ",strip=True)

            print(starts_on)
            print(mode)
            print(ends_on)

        except:
            print("opps!!!")
        
        time.sleep(10)
        driver.back()


        i+=1
        if(i==5):
            break
    # previous_challenge_div =
except :
    print("Loading took too much time!")



time.sleep(10)
# driver.quit()

