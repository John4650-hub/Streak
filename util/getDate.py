'''
get date and year
'''
import datetime
def date_today():
    ''' returns today's date'''''
    return datetime.datetime.today()
    
def getMonthInYr():
  months=[]
  for i in range(1,13):
    months.append(datetime.date(2023,i,i).strftime("%B"))
  return months