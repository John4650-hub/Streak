from flask import render_template, request, Response
from my_app import streaker_app
import json
import time
@streaker_app.route('/')
@streaker_app.route('/streaker')
def index():
  return render_template('index.html')

@streaker_app.route('/get-streak-data')
def send_json():
  with open('Db/data.json','r') as file:
    data = json.load(file)
  return json.dumps(data)



@streaker_app.route('/stream/<int:duration>')
def stream(duration):
    def generate():
        remaining_duration = duration * 60 # Convert minutes to seconds
        while remaining_duration > 0:
            time.sleep(1) # Wait for 1 second
            mins, secs = divmod(remaining_duration, 60) # Calculate minutes and seconds
            yield f'data: {str(mins).zfill(2)}:{str(secs).zfill(2)}\n\n' # Yield formatted time
            remaining_duration -= 1 # Decrement timer
        yield f'data: done\n\n' # Yield a signal to indicate the timer is done
    return Response(generate(), mimetype='text/event-stream')
    
@streaker_app.route('/saveTimeSpent',methods=['POST'])
def saveTimeSpent():
  progData=request.get_json()
  cur_month = progData["curMonth"]
  cur_year = progData["curYear"]
  with open('Db/data.json','r') as fh:
    data = json.load(fh)
    fh.close()
  data[cur_year][cur_month][int(progData['curDate'])-1]+=int(progData["timeTaken"])
  with open('Db/data.json','w') as fh:
    json.dump(data,fh)
  return "data saved to database"
