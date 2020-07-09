# Dependencies
from bs4 import BeautifulSoup
import requests
import pymongo

def getnumber():
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.hmdb_db
    db.topics.drop()
    collection = db.topics
    url = 'https://www.hmdb.org/categories.asp'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    results = soup.find_all('div', class_='fourcol bodysansserifsmaller')[1].find_all('td')
    post = []
    for x in results:
        title = x.find("button").get_text()
        number = x.find("i").get_text()
        number = number.replace('(','').replace (')','').replace (',','')
        post = {
            'title': title,
            'number': int(number),
        }
        # print(number)
        collection.insert_one(post)
    monuments = db.topics.find()
    lst = []
    for monument in monuments:
        mnmt = {}
        for x in monument:
            if x != "_id":
                mnmt[x]= monument[x]
        lst.append(mnmt)

    # print(monuments)
    return lst