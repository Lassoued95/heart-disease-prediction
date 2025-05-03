from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)

# Allow CORS from the frontend running on localhost:3000
CORS(app, origins=["http://localhost:3000"])

# Load the trained model (replace with your actual model file)
model = joblib.load('heart_disease_model.pkl')  # Replace with your model path

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON data from the request

    # Extract the features from the received data
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

    # Predict the outcome (0 or 1)
    prediction = model.predict(features)

    # Return the result as JSON
    result = 'Presence' if prediction[0] == 1 else 'Absence'
    return jsonify({'prediction': result})

if __name__ == '__main__':
    # Use the port provided by Render's environment, default to 5000 if not set
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
