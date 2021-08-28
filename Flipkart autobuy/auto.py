from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


em=input("Enter email registered on Flipkart  :     ")
ps=input("Enter password                            :     ")
mob=input("Enter product                             :     ")
pin=input("Enter pincode                             :     ")

executable_path="C:\Program Files (x86)\chromedriver.exe"
driver=webdriver.Chrome(executable_path)
driver.get("https://www.flipkart.com")
driver.maximize_window()

driver.implicitly_wait(20)   #website load nhi hue toh max. 20 sec rukega
wait=WebDriverWait(driver,10)

try:
    login=wait.until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[2]/div/div/div/div/div[2]/div/form/div[3]/button')))
except:
    login=wait.until(EC.element_to_be_clickable((By.XPATH,'//*[contains(@class,"_2AkmmA _1LctnI _7UHT_c)]')))


email=driver.find_element_by_xpath('/html/body/div[2]/div/div/div/div/div[2]/div/form/div[1]/input')
if(email.is_displayed()):
    email.send_keys(em)

password=driver.find_element_by_xpath('/html/body/div[2]/div/div/div/div/div[2]/div/form/div[2]/input')
if(password.is_displayed()):
    password.send_keys(ps)

login.click()

time.sleep(2)

find=wait.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/button')))
search=driver.find_element_by_xpath('//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/div/input')
if(search.is_displayed()):
    search.send_keys(mob)

find.click()

time.sleep(10)     # select the mobile

windows=driver.window_handles

for w in windows:
    driver.switch_to.window(w)

driver.maximize_window()

check=wait.until(EC.element_to_be_clickable((By.CLASS_NAME,'_2aK_gu')))
address=driver.find_element_by_xpath('//*[@id="pincodeInputId"]')
if(address.is_enabled()):
    address.send_keys(pin)
    check.click()


waitt=WebDriverWait(driver,0.1)
while(1):
    try:
        buy=waitt.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="container"]/div/div[3]/div[2]/div[1]/div[1]/div[2]/div/ul/li[2]/form/button')))
        buy.click()
        
    except :
        try:
            buy=waitt.until(EC.element_to_be_clickable((By.XPATH,'//*[contains(@class,"_2AkmmA _2Npkh4 _2kuvG8 _7UHT_c")]')))
            buy.click()
        except:
            driver.refresh()
