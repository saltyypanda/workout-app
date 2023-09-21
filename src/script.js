import axios from 'axios';
import { OpenAI } from 'openai';

document.getElementById('myButton').addEventListener('click', function() {
  sendMessage(); // Assuming sendMessage() is defined in the same file
});

const openai = new OpenAI({
  organization: "org-f2NApAOmy3mObCzhBPi4XHnw",
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function getChatCompletion() {
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
      { role: 'user', content: 'Say this is a test!' }
    ],
    temperature: 0.7
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
    return JSON.stringify(response.data);
    // return "it worked!!!"
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function sendMessage() {
  // // Get the user input from the input field
  // const userInput = document.getElementById('userInput').value;
  // const responseContainer = document.getElementById('responseContainer');

  // // Call getChatCompletion with user input
  const result = await getChatCompletion();
  alert(result);
}

// Example usage
// getChatCompletion()
//   .then(result => {
//     // result = returns an array of choices, and each choice is what I think is a tuple of
//     // data such as message, and the message has other fields
//     console.log('Response:', result.choices[0].message.content);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });