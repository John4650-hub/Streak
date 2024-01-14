from flask import render_template, request
from my_app import streaker_app
import json

@streaker_app.route('/')
@streaker_app.route('/streaker')
def index():
  return render_template('index.html')

@streaker_app.route('/get-streak-data', methods=['GET'])
def send_json():
  with open('Db/data.json','r') as file:
    data = json.load(file)
  return json.dumps(data)

# @streaker_app.route('/get-video-hist', methods=['POST'])
# def save_data():
#   data = request.json
#   unknown_key=list(data.keys())[0]
#   with open('Db/watch_hist.json','r') as fhand:
#     vidData=json.load(fhand)
#     vidData[unknown_key]=data[unknown_key]
#   with open('Db/watch_hist.json','w') as fhand:
#     json.dump(vidData,fhand)
#   return jsonify({"message": "Data saved successfully!"})

# @streaker_app.route('/set-video-hist', methods=['GET'])
# def set_vdata():
#   with open('Db/watch_hist.json','r') as fhand: 
#     data=json.load(fhand)
#   return json.dumps(data)