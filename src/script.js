import axios from 'axios';
import { OpenAI } from 'openai';

document.getElementById('myButton').addEventListener('click', function() {
  generateWorkout();
});

const openai = new OpenAI({
  organization: "org-f2NApAOmy3mObCzhBPi4XHnw",
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function getChatCompletion(message) {
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
      { role: 'user', content: message }
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


function generatePrompt(height, sex, weight, minutes, muscles) {
  const prompt = `Act as my personal trainer. I am a ${sex}, ${height} inches tall, ${weight} lbs.
                  I want you to write me workout that is ${minutes} minutes long, focusing on ${muscles}.
                  I want you to include the name of the exercise, how much time to do it for, and a description of the exercise.
                  Put all the information in table format`;
  
  return prompt;
}


export async function generateWorkout() {
  // Get the user input from the input field
  const height = document.getElementById('height').value.toString();
  const sex = document.getElementById('sex').value.toString();
  const weight = document.getElementById('weight').value.toString();
  const minutes = document.getElementById('minutes').value.toString();
  const muscles = document.getElementById('muscles').value.toString();

  const responseContainer = document.getElementById('responseContainer');

  const prompt = generatePrompt(height, sex, weight, minutes, muscles);

  // Call getChatCompletion with user input
  const result = await getChatCompletion(prompt);

  // Create a new element to hold the result
  const resultElement = document.createElement('div');
  resultElement.innerText = result; // Assuming result is a string

  // Append the result element to the response container
  responseContainer.appendChild(resultElement);
}