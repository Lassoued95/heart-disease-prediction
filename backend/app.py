from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)

# Allow CORS from your frontend on Vercel
CORS(app, origins=[
    "http://localhost:3000",  # Dev frontend
    "https://heart-disease-prediction-psi-ten.vercel.app"  # Deployed frontend
])


# Load your trained model
model = joblib.load('heart_disease_model.pkl')

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello from Flask!'})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    features = np.array([[
        data['age'],
        data['sex'],
        data['chest_pain'],
        data['bp'],
        data['cholesterol'],
        data['fbs_over_120'],
        data['ekg_results'],
        data['max_hr'],
        data['exercise_angina'],
        data['st_depression'],
        data['slope_st'],
        data['num_vessels'],
        data['thallium']
       
    ]])

    prediction = model.predict(features)
    result = 'Presence' if prediction[0] == 1 else 'Absence'
    return jsonify({'prediction': result})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
