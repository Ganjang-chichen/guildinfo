import requests                  # 웹 페이지의 HTML을 가져오는 모듈
from bs4 import BeautifulSoup    # HTML을 파싱하는 모듈
import time
import json
import urllib.request
import os
import sys

WorldID = {
    "리부트2" : 46,
    "리부트" : 45,
    "오로라" : 44,
    "레드" : 43,
    "이노시스" : 29,
    "유니온" : 10,
    "스카니아" : 0,
    "루나" : 3,
    "제니스" : 4,
    "크로아" : 5,
    "베라" : 1,
    "엘리시움" : 16,
    "아케인" : 50,
    "노바" : 51,
    "버닝" : 49,
    "버닝2" : 48,
    "버닝3" : 52
}

def isGuildExist(GuildName, World) :
    guild_select_url = "https://maplestory.nexon.com/Ranking/World/Guild?t=1&n=" + GuildName;
    SELECTED_GID = -1

    time.sleep(0.5)
    # 웹 페이지를 가져온 뒤 BeautifulSoup 객체로 만듦
    response = requests.get(guild_select_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    gid = []
    wid = []

    table = soup.find('tbody')

    if table :
        for tr in table.find_all('tr'):      # 모든 <tr> 태그를 찾아서 반복(각 지점의 데이터를 가져옴)
            tds = list(tr.find_all('td'))    # 모든 <td> 태그를 찾아서 리스트로 만듦

            a = tr.find('a')
            gid.append(a.get('href').split('?')[1].split('&')[0].split('=')[1])
            wid.append(a.get('href').split('?')[1].split('&')[1].split('=')[1])

        i = 0
        
        isExist = False
        
        for selected in wid :
            if selected == World:
                SELECTED_GID = gid[i]
                isExist = True
                return True
            i = i + 1   

        if isExist == False :
            return False


input = sys.argv
GuildName = input[1]
World =  str(WorldID[input[2]])

print(GuildName, World)

isGuildExist(GuildName, World)