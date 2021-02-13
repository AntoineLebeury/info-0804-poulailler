import sys
import asyncio
import requests

if len(sys.argv) != 2:
    print("Usage: ./get_data.py [receiver IP adress]")
    exit(1)
url = "http://" + sys.argv[1] + ":8080"
print("Server is at", url)

user_input = input()
data = {"data" : user_input}
r = requests.post(url, data = data)
