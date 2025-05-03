# backend/train_model.py
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv('Heart_Disease_Prediction.csv')

# Optional: map or clean data if needed
df['Heart Disease'] = df['Heart Disease'].map({'Absence': 0, 'Presence': 1})

# Features and labels
X = df.drop('Heart Disease', axis=1)
y = df['Heart Disease']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'heart_disease_model.pkl')
print("✅ Model saved as 'heart_disease_model.pkl'")
