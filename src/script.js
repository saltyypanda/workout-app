import axios from 'axios';
import { OpenAI } from 'openai';

document.getElementById('myButton').addEventListener('click', function() {
  sendMessage();
});

const openai = new OpenAI({
  organization: "org-f2NApAOmy3mObCzhBPi4XHnw",
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function getChatCompletion(userInput) {
  const OPENAI_API_KEY = openai.apiKey;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: userInput }
    ],
    temperature: 0.7
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
    return JSON.stringify(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function sendMessage() {
  // Get the user input from the input field
  const userInput = document.getElementById('userInput').value.toString();
  const responseContainer = document.getElementById('responseContainer');

  // Call getChatCompletion with user input
  const result = await getChatCompletion(userInput);

  // Create a new element to hold the result
  const resultElement = document.createElement('div');
  resultElement.innerText = result; // Assuming result is a string

  // Append the result element to the response container
  responseContainer.appendChild(resultElement);
}