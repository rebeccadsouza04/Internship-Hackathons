from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import pandas as pd
from csv import writer

PATH ='D:\Rebecca College\SEM 6\Mini project\InternshipAndHackathon\data\chromedriver.exe'
driver = webdriver.Chrome(PATH)

urls = ['https://internshala.com/internships/.net%20development,3d%20printing,aerospace,agriculture%20and%20food%20engineering,analytics,android,angular.js%20development,animation,artificial%20intelligence%20(ai),asp.net,automobile%20engineering,backend%20development,big%20data,biotech,blockchain%20development,cad%20design,chemical,civil,cloud%20computing,computer%20science,computer%20vision,cyber%20security,data%20science,database%20building,electrical,electronics,embedded%20systems,energy%20science%20and%20engineering,engineering,engineering%20design,engineering%20physics,flutter%20development,front%20end%20development,full%20stack%20development,game%20development,graphic%20design,image%20processing,industrial%20and%20production%20engineering,industrial%20design,information%20technology,instrumentation%20and%20control%20engineering,internet%20of%20things%20(iot),ios,java,javascript%20development,machine%20learning,magento%20development,manufacturing%20engineering,material%20science,mathematics,mathematics%20and%20computing,mechanical,mechatronics,metallurgy,mobile%20app%20development,motion%20graphics,naval%20and%20ocean,network%20engineering,node.js%20development,petroleum%20engineering,php%20development,programming,python%2Fdjango,ruby%20on%20rails,search%20engine%20optimization%20(seo),software%20development,software%20testing,ui%2Fux,web%20development,wordpress%20development-internship']

i = 0

df = pd.DataFrame()

for url in urls:
    driver.get(url)

    if(i==0):
        close_popup = driver.find_element_by_id('close_popup')
        close_popup.click()
        i += 1


    pages =driver.find_element_by_id('total_pages')
    total_pages=int(pages.text)
    current_page =1

    category = []
    companyname = []
    locationname = []
    start_date = []
    duration = []
    stipend = []
    apply_by = []


    while current_page <= total_pages:
        print()
        print(f'current_page is: {current_page}')
        try:
            container_list_dummy = WebDriverWait(driver,5).until(EC.presence_of_element_located((By.ID, f'internship_list_container_{current_page}')))

            page_source = driver.page_source
            soup = BeautifulSoup(page_source, 'lxml')

            container_list = soup.select('#internship_list_container')
            
            internship_list = container_list[0].select('.individual_internship')

            for internship in internship_list:
                company=internship.find('div',class_='company')
                Internship_title=company.find('div',class_='profile').find('a').get_text(" ",strip=True)
                company_name=company.find('div',class_='company_name').find('a').get_text(" ",strip=True)
                location = internship.find(id='location_names').find('span').get_text(" ",strip=True)
                details = internship.find('div',class_='internship_other_details_container').get_text(" ",strip=True)

                details = details.split("Duration")
                details[0] = details[0].replace(u'\xa0', u' ')
                details[0] = details[0].replace(u'Start Date', u'')
                details[0] = details[0].replace(u'Immediately',u'')

                start_date.append(details[0])
                del details[0]

                details = ''.join(details)

                details = details.split("Stipend")
                duration.append(details[0])
                del details[0]

                details = ''.join(details)

                details = details.split("Apply By")
                stipend.append(details[0])
                del details[0]

                details = ''.join(details)
                apply_by.append(details)
                
                #print(details)

                category.append(Internship_title)
                companyname.append(company_name)
                locationname.append(location)

                
            current_page = current_page + 1
            next = WebDriverWait(driver,5).until(EC.presence_of_element_located((By.ID, 'next')))
            next.click()
        except :
            print("Loading took too much time!")

    df1 = pd.DataFrame({'Internship Category': category, 'Company name': companyname, 'location': locationname, 'Start Date': start_date, 'Duration': duration, 'Stipend': stipend, 'Apply By': apply_by}) 

    df = df.append(df1)

df.to_csv('products.csv', index=False, encoding='utf-8')

time.sleep(10)
driver.quit()
