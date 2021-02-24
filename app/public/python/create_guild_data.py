import requests                  # 웹 페이지의 HTML을 가져오는 모듈
from bs4 import BeautifulSoup    # HTML을 파싱하는 모듈
import time
import json
import urllib.request
import pymysql
import sys
import os

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

conn = pymysql.connect(
    user='root',
    passwd='dhkswjsvhrltjsdjs!',
    host='127.0.0.1',
    db='guild_management',
    charset='utf8'
)
cursor = conn.cursor(pymysql.cursors.DictCursor)

def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)
        
def find_Dojang (name) :
    dojang_floor = 'NON'
    dojang_time = 'NON'
   
    dojang_cur_url = 'https://maple.gg/u/' + name
    
    dojang_cur_res = requests.get(dojang_cur_url)
    dojang_cur_s = BeautifulSoup(dojang_cur_res.content, 'html.parser')

    if dojang_cur_s.find('h1', {'class' : 'user-summary-floor'}) :
        dojang_best_info = dojang_cur_s.find('h1', {'class' : 'user-summary-floor'}).text.replace(' ','').replace('\n','')
        if int(dojang_best_info.replace('층','')) < 10 :
            dojang_best_info = '0' + dojang_best_info
    else:
        dojang_best_info = '00층'

    if(dojang_cur_s.find('tbody')) :
        dojang_latest_info = dojang_cur_s.find('tbody').find('tr').find('h5').text
        if int(dojang_latest_info.replace('층','')) < 10 :
            dojang_latest_info = '0' + dojang_latest_info
    else :
        dojang_latest_info = '00층'
    
    

    if (dojang_cur_s.find_all('li', {'class' : 'user-summary-item'})) :
        dojang_class_info = dojang_cur_s.find_all('li', {'class' : 'user-summary-item'})[1].text
    else :
        dojang_class_info = 'X'

    return [dojang_best_info, dojang_latest_info, dojang_class_info]



def make_guild_data_mk2 (GuildName, World) :
    guild_select_url = "https://maplestory.nexon.com/Ranking/World/Guild?t=1&n=" + GuildName
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
            
            i = i + 1   

        if isExist == False :
            return "No data"
            
        page_num = 1
        data = []

        while True :

            guild_url = 'https://maplestory.nexon.com/Common/Guild?gid=' + SELECTED_GID + '&wid=' + World + '&orderby=1&page=' + str(page_num)

            res = requests.get(guild_url)
            time.sleep(0.5)
            s = BeautifulSoup(res.content, 'html.parser')

            table = s.find('table')

            if table :
                1
            else :
                break

            for tr in table.find_all('tr'):
                tds = list(tr.find_all('td'))

                for td in tds:
                    if td.find('span', {'class' : 'char_img'}):
                        col1 = tds[0].text.replace(' ', '').replace('\n', '').replace('\r', '') # 직위
                        col2 = td.find('span', {'class' : 'char_img'}).find('img').get('src')   # 케릭터 그림
                        col3 = tds[2].text.replace(' ', '').replace('\n', '').replace('\r', '') # 레벨
                        col4 = tds[3].text.replace(' ', '').replace('\n', '').replace('\r', '') # 경험치
                        col5 = tds[4].text.replace(' ', '').replace('\n', '').replace('\r', '') # 인기도

                        col21 = tds[1].find('a').text # 닉네임
                        col22 = tds[1].find('dd').text # 직업 (대분류)
                        
                        
                        Dojang_log = find_Dojang(str(col21))
                        
                        
                        col = {'position' : col1,
                               'img_src' : col2,
                               'name' : col21,
                               'class' : Dojang_log[2],
                               'Lv' : col3,
                               'exp' : col4,
                               'popularity' : col5,
                               'dojang_best_info' : Dojang_log[0],
                               'dojang_latest_info' : Dojang_log[1]}
                        
                        data.append(col)

            page_num+=1

        print('success')

    else :
        return 'No Data'
        
    return data

def weekly_prestige (GuildName, World) :
    guild_select_url = "https://maplestory.nexon.com/Ranking/World/Guild?t=1&n=" + GuildName;
    SELECTED_GID = -1
    
    time.sleep(0.5)
    # 웹 페이지를 가져온 뒤 BeautifulSoup 객체로 만듦
    response = requests.get(guild_select_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    gid = []
    wid = []
    prestiges = []

    table = soup.find('tbody')

    if table :
        for tr in table.find_all('tr'):      # 모든 <tr> 태그를 찾아서 반복(각 지점의 데이터를 가져옴)
            tds = list(tr.find_all('td'))    # 모든 <td> 태그를 찾아서 리스트로 만듦

            a = tr.find('a')
            gid.append(a.get('href').split('?')[1].split('&')[0].split('=')[1])
            wid.append(a.get('href').split('?')[1].split('&')[1].split('=')[1])
            prestiges.append(tds[4].text)

        i = 0
        
        isExist = False
        
        for selected in wid :
            if selected == World:
                return prestiges[i]
                isExist = True
            
            i = i + 1   

        if isExist == False :
            return "No data"
        
    else : 
        return "No data"

def weekly_flag (GuildName, World) :
    guild_select_url = "https://maplestory.nexon.com/Ranking/World/Guild?t=0&n=" + GuildName;
    SELECTED_GID = -1

    time.sleep(0.5)
    # 웹 페이지를 가져온 뒤 BeautifulSoup 객체로 만듦
    response = requests.get(guild_select_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    gid = []
    wid = []
    prestiges = []

    table = soup.find('tbody')

    if table :
        for tr in table.find_all('tr'):      # 모든 <tr> 태그를 찾아서 반복(각 지점의 데이터를 가져옴)
            tds = list(tr.find_all('td'))    # 모든 <td> 태그를 찾아서 리스트로 만듦

            a = tr.find('a')
            gid.append(a.get('href').split('?')[1].split('&')[0].split('=')[1])
            wid.append(a.get('href').split('?')[1].split('&')[1].split('=')[1])
            prestiges.append(tds[4].text)

        i = 0
        
        isExist = False
        
        for selected in wid :
            if selected == World:
                return prestiges[i]
                isExist = True
            
            i = i + 1   

        if isExist == False :
            return "No data"
        
    else : 
        return "No data"

def weekly_rade (GuildName, World) :
    guild_select_url = "https://maplestory.nexon.com/Ranking/World/Guild?t=2&n=" + GuildName;
    SELECTED_GID = -1

    time.sleep(0.5)
    # 웹 페이지를 가져온 뒤 BeautifulSoup 객체로 만듦
    response = requests.get(guild_select_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    gid = []
    wid = []
    prestiges = []

    table = soup.find('tbody')

    if table :
        for tr in table.find_all('tr'):      # 모든 <tr> 태그를 찾아서 반복(각 지점의 데이터를 가져옴)
            tds = list(tr.find_all('td'))    # 모든 <td> 태그를 찾아서 리스트로 만듦

            a = tr.find('a')
            gid.append(a.get('href').split('?')[1].split('&')[0].split('=')[1])
            wid.append(a.get('href').split('?')[1].split('&')[1].split('=')[1])
            prestiges.append(tds[4].text)

        i = 0
        
        isExist = False
        
        for selected in wid :
            if selected == World:
                return prestiges[i]
                isExist = True
            
            i = i + 1   

        if isExist == False :
            return "No data"
    else : 
        return "No data"

        
def data_input(userID, World, GuildName, flag, rade, data): #데이터 입력
    if rade == 'No data':
        rade = 0
    else :
        rade = rade.replace(',','')
    if flag == 'No data':
        flag = 0
    else :
        flag = flag.replace(',','')

    sql = "INSERT INTO guild_info (input_date, manager, world, name, flag, rade) VALUES ( CURDATE(), '" + userID + "', '" + World + "', '" + GuildName + "', '" + str(flag) + "', '" + str(rade) + "')"
    
    cursor.execute(sql)
    conn.commit()
    
    for datas in data:
    
        sql = ( "INSERT INTO char_info (input_date, world, gname, position, name, class, lv, exp, popularity, dojang_best_info, dojang_latest_info) "
               "VALUES ( CURDATE(), '" + World + "', '" + GuildName + "', '" + datas['position'] + "', '" + datas['name'] + "', '" + datas['class'] + "', '" + datas['Lv'] + "', '" + datas['exp'] + "', '" + datas['popularity'] + "', '" + datas['dojang_best_info'] + "', '" + datas['dojang_latest_info'] + "' )" )
        cursor.execute(sql)
        conn.commit()
        url = datas['img_src']
        createFolder('./public/images/' + World + '/' + GuildName)
        urllib.request.urlretrieve(url, './public/images/' + World + '/' + GuildName + '/' + datas['name'] + ".png")
        time.sleep(0.5)
    
    cursor.close


input = sys.argv

GuildName = input[1]
World =  str(input[2])
userID = str(input[3])

print(GuildName, World)

data =  make_guild_data_mk2(GuildName, World)
prestige = weekly_prestige(GuildName, World)
flag = weekly_flag(GuildName, World)
rade = weekly_rade(GuildName, World)

data_input(userID, World, GuildName, flag, rade, data)