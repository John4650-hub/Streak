"""
write data from to data.json  file
"""
import json
from time import sleep
from tqdm import trange,tqdm
from util.getDate import date_today, getMonthInYr

with open('data.json','r',encoding="utf-8") as jsonFile:
    data = json.load(jsonFile)
myDateObject = date_today()
cur_year = myDateObject.strftime("%Y")
cur_month = myDateObject.strftime("%B")
cur_day = myDateObject.strftime("%d")

y = data[cur_year][cur_month]
if cur_day[0]=="0":
  cur_day = int(cur_day[1])
else:
  cur_day=int(cur_day)
for (y,months) in data.items():
  if cur_month in months:
    current_streak = (months[cur_month])
    if len(current_streak)<cur_day-1:
      for i in range(0,(cur_day-1)-len(current_streak)):
        current_streak.append(0)
  break
class PomodoroTimer:
  def __init__(self):
    pass
  def pomoRun(self):
    usr = 30
    usr=usr*60
    with tqdm(total=usr,colour="#00ff00",bar_format="{desc}|{bar}|{percentage:3.0f}%]") as pomo:
      for i in range(usr):
        m,s= divmod(usr,60)
        sleep(1)
        pomo.set_description('Studying📚 > {:02d}:{:02d}'.format(int(m), int(s)))
        usr-=1
        pomo.update(1)
    return 1
  def pomoRest(self):
    print('Congrats on cmpleting your study session')
    restDur=4*60
    with tqdm(total=restDur,colour="#0000ff",bar_format="{desc}|{bar}|{percentage:3.0f}%]") as restSession:
      for i in range(restDur):
        m,s= divmod(restDur,60)
        sleep(1)
        restSession.set_description('Resting > {:02d}:{:02d}'.format(int(m), int(s)))
        restDur-=1
        restSession.update(1)

def fillMonths():
  months = getMonthInYr()
  for i in months:
    if i in data[cur_year]:
      continue
    else:
      data[cur_year][i]=[]
def saveProgress(my_progress):
  with open("data.json","w") as streakData:
    json.dump(my_progress,streakData,indent=1)
    streakData.close()
  print("Current progress saved")


mySession = PomodoroTimer()
for i in range(0,2):
  pomo=mySession.pomoRun()
  current_streak[-1]+=pomo
  data[cur_year][cur_month]=current_streak
  saveProgress(data)
  mySession.pomoRest()
    