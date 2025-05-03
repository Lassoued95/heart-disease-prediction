import type { NextApiRequest, NextApiResponse } from 'next';

const predictHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            // Forward the POST request to Flask backend
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body), // Send the form data to Flask
            });

            const data = await response.json();
            res.status(200).json(data);  // Send back the prediction to frontend

        } catch (error) {
            console.error('Prediction error:', error);
            res.status(500).json({ error: 'Error in predicting heart disease' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};

export default predictHandler;
