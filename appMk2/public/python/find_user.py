import requests                  # 웹 페이지의 HTML을 가져오는 모듈
from bs4 import BeautifulSoup    # HTML을 파싱하는 모듈
import time
import json
import urllib.request
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

import json
from collections import OrderedDict

def find_user (name) :
    user_url = "https://maplestory.nexon.com/Ranking/World/Total?c=" + name
    
    res = requests.get(user_url)
    user_info = BeautifulSoup(res.content, 'html.parser')
    
    if user_info.find('div', {'class' : 'none_list2'}) :
        print("no data")
        print("no data")
        return
    else :
        table = user_info.find('tbody')

        if table :
            for tr in table.find_all('tr'):      # 모든 <tr> 태그를 찾아서 반복(각 지점의 데이터를 가져옴)
                tds = list(tr.find_all('td'))    # 모든 <td> 태그를 찾아서 리스트로 만듦

                a = tr.find('a')
                parse_name = tds[1].find('a').text
                guild_name = tds[5].text
                if(parse_name == name) :
                    print(parse_name)
                    print(guild_name)
                    return
                

input = sys.argv

char_name = input[1]

find_user(char_name)