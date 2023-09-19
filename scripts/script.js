const apiURL = process.env.OPENAI_API_URL;
const apiKey = process.env.OPENAI_API_KEY;
// const axios = require('axios');


// const { OpenAI } = require("openai");

// const openai = new OpenAI({
//   organization: "org-f2NApAOmy3mObCzhBPi4XHnw",
//   apiKey: process.env.OPENAI_API_KEY
// });

async function getChatCompletion(content) {
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
      { role: 'user', content: `${content}` }
    ],
    temperature: 0.7
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function sendMessage() {
  // Get the user input from the input field
  const userInput = document.getElementById('userInput').value;
  const responseContainer = document.getElementById('responseContainer');

  // Call getChatCompletion with user input
  // const result = await getChatCompletion(userInput);
  alert("apiKey");
}

// Example usage
getChatCompletion("How are you today?")
  .then(result => {
    // result = returns an array of choices, and each choice is what I think is a tuple of
    // data such as message, and the message has other fields
    console.log('Response:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });