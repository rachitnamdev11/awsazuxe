import requests

url = "https://sgd0o8sve0.execute-api.ap-south-1.amazonaws.com/prod/predict"

data = [[5.1,3.5,1.4,0.2]]

response = requests.post(url, json=data)

print(response.status_code)
print(response.text)