from fastapi import FastAPI
import pickle
import os

app = FastAPI()

BASE_DIR = os.path.dirname(__file__)

try:
    model = pickle.load(open(os.path.join(BASE_DIR, "model.pkl"), "rb"))
    vectorizer = pickle.load(open(os.path.join(BASE_DIR, "vectorizer.pkl"), "rb"))
except Exception as e:
    print("MODEL LOAD ERROR:", e)

@app.get("/")
def home():
    return {"message": "API is running"}

@app.post("/predict")
def predict(text: str):
    data = vectorizer.transform([text])
    prediction = model.predict(data)[0]

    return {"result": "Spam" if prediction == 1 else "Not Spam"}