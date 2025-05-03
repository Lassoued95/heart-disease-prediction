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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const numericFormData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
        );

        try {
            // Replace with your deployed Flask API URL
            const response = await fetch('https://heart-disease-prediction-rirxutbcx-mohamed-lassoueds-projects.vercel.app/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(numericFormData),
            });

            const result = await response.json();
            console.log("✅ Backend response:", result);
            alert(`Prediction result: ${result.prediction}`);
        } catch (error) {
            console.error("❌ Error connecting to API:", error);
            alert("An error occurred while making the prediction.");
        }
    };

    return (
        <div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-900 min-h-screen'>
            <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
                    Heart Disease Prediction
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            <label htmlFor={name} className="mb-1 text-gray-700">{label}</label>
                            <input
                                type="number"
                                name={name}
                                value={formData[name as keyof typeof formData]}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-lg"
                                placeholder={label}
                                required
                            />
                        </div>
                    ))}

                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-transform duration-300"
                        >
                            🚀 Predict Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedicalForm;
