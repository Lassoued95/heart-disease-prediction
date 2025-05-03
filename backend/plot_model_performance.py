import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
from sklearn.model_selection import learning_curve
from sklearn.metrics import roc_curve, roc_auc_score

# Load dataset
df = pd.read_csv('Heart_Disease_Prediction.csv')

# Optional: map or clean data if needed
df['Heart Disease'] = df['Heart Disease'].map({'Absence': 0, 'Presence': 1})

# Features and labels
X = df.drop('Heart Disease', axis=1)
y = df['Heart Disease']

# Load the pre-trained model
model = joblib.load('heart_disease_model.pkl')

# Option 1: Plot Learning Curve
train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, scoring='accuracy', train_sizes=np.linspace(0.1, 1.0, 10), n_jobs=-1)

plt.figure(figsize=(10, 6))
plt.plot(train_sizes, train_scores.mean(axis=1), label='Training Score', color='blue')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation Score', color='green')
plt.fill_between(train_sizes, train_scores.mean(axis=1) - train_scores.std(axis=1),
                 train_scores.mean(axis=1) + train_scores.std(axis=1), alpha=0.1, color='blue')
plt.fill_between(train_sizes, val_scores.mean(axis=1) - val_scores.std(axis=1),
                 val_scores.mean(axis=1) + val_scores.std(axis=1), alpha=0.1, color='green')

plt.title('Learning Curve')
plt.xlabel('Training Size')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)
plt.show()

# Option 2: Plot ROC Curve
y_pred_prob = model.predict_proba(X)[:, 1]  # Predict probabilities for the positive class
fpr, tpr, thresholds = roc_curve(y, y_pred_prob)

plt.figure(figsize=(10, 6))
plt.plot(fpr, tpr, color='blue', label='ROC Curve')
plt.plot([0, 1], [0, 1], color='gray', linestyle='--')  # Diagonal line for random classifier
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend(loc='lower right')
plt.grid(True)
plt.show()

# Calculate AUC (Area Under the Curve)
auc = roc_auc_score(y, y_pred_prob)
print(f'AUC: {auc}')
