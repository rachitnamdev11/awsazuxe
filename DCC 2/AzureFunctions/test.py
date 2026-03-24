import requests
import json

# Replace with your actual Function App base URL
BASE_URL = "https://myfunctionapp123.azurewebsites.net/api"

def test_sum_function():
    url = f"{BASE_URL}/SumFunction"
    payload = {"numbers": [1, 2, 3, 4, 5]}
    response = requests.post(url, json=payload)
    print("SumFunction Response:", response.text)

def test_reverse_function():
    url = f"{BASE_URL}/ReverseFunction"
    params = {"text": "hello world"}
    response = requests.get(url, params=params)
    print("ReverseFunction Response:", response.text)

def test_array_function():
    url = f"{BASE_URL}/ArrayFunction"
    payload = {"array": [1, 2, 3]}
    response = requests.post(url, json=payload)
    print("ArrayFunction Response:", response.text)

if __name__ == "__main__":
    test_sum_function()
    test_reverse_function()
    test_array_function()
