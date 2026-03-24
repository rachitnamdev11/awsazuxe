**A web API where user sends text → ML model predicts Spam / Not Spam → deployed on Azure**



Step 1: Open Notebook Go to Google Colab



import pandas as pd

from sklearn.model\_selection import train\_test\_split

from sklearn.feature\_extraction.text import CountVectorizer

from sklearn.naive\_bayes import MultinomialNB

import pickle



\# Sample dataset

data = {

&#x20;   "text": \[

&#x20;       "Win money now", "Hello friend", "Free prize claim now",

&#x20;       "Let's meet tomorrow", "Urgent! Call now", "How are you?"

&#x20;   ],

&#x20;   "label": \[1, 0, 1, 0, 1, 0]  # 1 = Spam, 0 = Not Spam

}



df = pd.DataFrame(data)



\# Convert text → numbers

vectorizer = CountVectorizer()

X = vectorizer.fit\_transform(df\["text"])



y = df\["label"]



\# Train model

model = MultinomialNB()

model.fit(X, y)



\# Save model + vectorizer

pickle.dump(model, open("model.pkl", "wb"))

pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))



print("Model saved!")





Step 3: Download Files

Download: model.pkl, vectorizer.pkl



Step 4: Create Project Files

spam-api/application.py

from fastapi import FastAPI

import pickle

import os



app = FastAPI()



BASE\_DIR = os.path.dirname(\_\_file\_\_)



try:

&#x20;   model = pickle.load(open(os.path.join(BASE\_DIR, "model.pkl"), "rb"))

&#x20;   vectorizer = pickle.load(open(os.path.join(BASE\_DIR, "vectorizer.pkl"), "rb"))

except Exception as e:

&#x20;   print("MODEL LOAD ERROR:", e)



@app.get("/")

def home():

&#x20;   return {"message": "API is running"}



@app.post("/predict")

def predict(text: str):

&#x20;   data = vectorizer.transform(\[text])

&#x20;   prediction = model.predict(data)\[0]



&#x20;   return {"result": "Spam" if prediction == 1 else "Not Spam"}





spam-api/requirements.txt

fastapi

uvicorn

gunicorn

scikit-learn

pandas



Step 6: Add Your Model Files

Place inside folder:model.pkl,vectorizer.pkl



Step 7: Zip the Folder



Step 8: Go to Azure



Step 9: Create App Service

1.Click Create Resource

2.Select Web App

3.Fill:

Setting	Value

Name	spam-api-app

Runtime	Python 3.10

Region	Closest to you

Plan	Free (F1)



Click Create







Step 10: Deploy Code

Inside App Service: 1.Go to spam-api-app/Deployment/Deployment Center

2\. Choose: Source: Publish files (new)

3\. Upload your spam-api.zip



Step 11: Configure Startup Command

Go to:

👉 Settings → Configuration → General Settings -> Stack settings



Add : gunicorn -w 4 -k uvicorn.workers.UvicornWorker application:app

Apply



environment variables: Add

SCM\_DO\_BUILD\_DURING\_DEPLOYMENT = true

// ENABLE\_ORYX\_BUILD = true



Save \& Restart



Step 12: Open URL(https://your-app-name.azurewebsites.net)





Step 13: Test Prediction

Use browser / Postman:

POST https://your-app-name.azurewebsites.net/predict?text=win money now

