// server.ts (backend)

import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/recipe', async (req, res) => {
  const { prompt } = req.body; // Extracting the prompt from the request body

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Initialize the Gemini API
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Use the desired model

  try {
    // Request content from the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // Extract text from the response

    res.json({ recipe: text }); // Send the response back to the client
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Something went wrong while fetching the recipe.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
