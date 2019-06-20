import requests
import json
import os
import datetime

def post_to_file(url, headers, log):
    now = datetime.datetime.now()
    date = str(now.year) + str(now.month) + str(now.day)
    body = {"date": date, "log": log}
    #print(url, json.dumps(body), headers)
    response = requests.post(url, data=json.dumps(body), headers=headers)
    return response

def main():
    url = os.environ.get('COMMITTER_API_BASE_URL')
    headers = {"content-type":"application/json"}
    log = ""
    while(len(log)==0):
        log = input("Enter commit text: ")
    response = post_to_file(url, headers, log)
    print(response.content.decode('utf-8'))

if __name__ == "__main__":
    main()
