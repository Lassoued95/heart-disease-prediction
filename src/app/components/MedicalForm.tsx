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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convert all form data to numeric values before sending
        const numericFormData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
        );

        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(numericFormData),
        });

        const result = await response.json();
        console.log("✅ Backend response:", result);
        alert(`Prediction result: ${result.prediction}`);
    };

    return (
        <div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-900 min-h-screen '>
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Heart Disease Prediction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="age" className="mb-1 text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter your age"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="sex" className="mb-1 text-gray-700">Sex (1 = Male, 0 = Female)</label>
                    <input
                        type="number"
                        name="sex"
                        value={formData.sex}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter sex (1 or 0)"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="chest_pain" className="mb-1 text-gray-700">Chest Pain Type</label>
                    <input
                        type="number"
                        name="chest_pain"
                        value={formData.chest_pain}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter chest pain type (1-4)"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="bp" className="mb-1 text-gray-700">Blood Pressure (BP)</label>
                    <input
                        type="number"
                        name="bp"
                        value={formData.bp}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter blood pressure"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="cholesterol" className="mb-1 text-gray-700">Cholesterol</label>
                    <input
                        type="number"
                        name="cholesterol"
                        value={formData.cholesterol}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter cholesterol level"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="fbs_over_120" className="mb-1 text-gray-700">Fasting Blood Sugar {'>'} 120</label>
                    <input
                        type="number"
                        name="fbs_over_120"
                        value={formData.fbs_over_120}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter 1 for Yes, 0 for No"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="ekg_results" className="mb-1 text-gray-700">EKG Results</label>
                    <input
                        type="number"
                        name="ekg_results"
                        value={formData.ekg_results}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter EKG result (0-2)"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="max_hr" className="mb-1 text-gray-700">Max Heart Rate</label>
                    <input
                        type="number"
                        name="max_hr"
                        value={formData.max_hr}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter max heart rate"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="exercise_angina" className="mb-1 text-gray-700">Exercise Angina</label>
                    <input
                        type="number"
                        name="exercise_angina"
                        value={formData.exercise_angina}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter 1 for Yes, 0 for No"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="st_depression" className="mb-1 text-gray-700">ST Depression</label>
                    <input
                        type="number"
                        name="st_depression"
                        value={formData.st_depression}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter ST depression value"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="slope_st" className="mb-1 text-gray-700">Slope of ST</label>
                    <input
                        type="number"
                        name="slope_st"
                        value={formData.slope_st}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter slope (1-3)"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="num_vessels" className="mb-1 text-gray-700">Number of Vessels</label>
                    <input
                        type="number"
                        name="num_vessels"
                        value={formData.num_vessels}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter number of vessels"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="thallium" className="mb-1 text-gray-700">Thallium</label>
                    <input
                        type="number"
                        name="thallium"
                        value={formData.thallium}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter thallium value (1-3)"
                    />
                </div>
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
