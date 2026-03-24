import json
import joblib
import numpy as np

def init():
    global model
    model_path = os.path.join(os.getenv("AZUREML_MODEL_DIR"), "model.pkl")
    model = joblib.load(model_path)

def run(raw_data):
    try:
        data = json.loads(raw_data)

        # Input order must match training
        features = np.array([[
            data['area'],
            data['bedrooms'],
            data['bathrooms'],
            data['stories'],
            data['parking']
        ]])

        prediction = model.predict(features)

        return {"prediction": float(prediction[0])}

    except Exception as e:
        return {"error": str(e)}