"use client";
import { useState } from 'react';

const MedicalForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        chest_pain: '',
        bp: '',
        cholesterol: '',
        fbs_over_120: '',
        ekg_results: '',
        max_hr: '',
        exercise_angina: '',
        st_depression: '',
        slope_st: '',
        num_vessels: '',
        thallium: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const numericFormData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
        );

        try {
            const response = await fetch('https://heart-api-3txz.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(numericFormData),
            });

            const result = await response.json();
            setPrediction(result.prediction);
            setIsLoading(false);
            alert(`Prediction result: ${result.prediction === "Presence" ? '😢 Heart Disease Detected' : '❤️ No Heart Disease'}`);
        } catch (error) {
            console.error("❌ Error connecting to API:", error);
            setIsLoading(false);
            alert("An error occurred while making the prediction.");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-900 min-h-screen p-4">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Heart Disease Prediction</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {[{
                        name: 'age', label: 'Age'
                    }, {
                        name: 'sex', label: 'Sex (1 = Male, 0 = Female)'
                    }, {
                        name: 'chest_pain', label: 'Chest Pain Type (1-4)'
                    }, {
                        name: 'bp', label: 'Blood Pressure'
                    }, {
                        name: 'cholesterol', label: 'Cholesterol'
                    }, {
                        name: 'fbs_over_120', label: 'Fasting Blood Sugar > 120 (0 or 1)'
                    }, {
                        name: 'ekg_results', label: 'EKG Results (0-2)'
                    }, {
                        name: 'max_hr', label: 'Max Heart Rate'
                    }, {
                        name: 'exercise_angina', label: 'Exercise Angina (0 or 1)'
                    }, {
                        name: 'st_depression', label: 'ST Depression'
                    }, {
                        name: 'slope_st', label: 'Slope of ST (1-3)'
                    }, {
                        name: 'num_vessels', label: 'Number of Vessels (0-3)'
                    }, {
                        name: 'thallium', label: 'Thallium (1-3)'
                    }].map(({ name, label }) => (
                        <div className="flex flex-col" key={name}>
                            <label htmlFor={name} className="mb-2 text-lg font-semibold text-gray-700">{label}</label>
                            <input
                                type="number"
                                name={name}
                                value={formData[name as keyof typeof formData]}
                                onChange={handleInputChange}
                                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                placeholder={label}
                                required
                            />
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-transform duration-300"
                        >
                            {isLoading ? 'Loading...' : '🚀 Predict Now'}
                        </button>
                    </div>
                </form>

                {prediction && (
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-medium text-gray-700">Prediction Result</h3>
                        <p className={`text-2xl font-bold ${prediction === 'Presence' ? 'text-red-500' : 'text-green-500'}`}>
                            {prediction === 'Presence' ? 'Heart Disease Detected 😢' : 'No Heart Disease ❤️'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalForm;
