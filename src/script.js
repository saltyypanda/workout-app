import axios from 'axios';
import { OpenAI } from 'openai';

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
    const workoutString = JSON.stringify(response.data.choices[0].message.content);
    return workoutString;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function generatePrompt(height, sex, weight, minutes, muscles) {
  return `Act as my personal trainer. I am a ${sex}, ${height} inches tall, ${weight} lbs.
          I want you to write me workout that is ${minutes} minutes long, focusing on ${muscles}.
          I want you to include the name of the exercise, how much time to do it for, and a description of the exercise.
          Put all the information in JSON format all one one line. Do not say anything before or after`;
}

function parseJSONWorkout(JSONString) {
  const JSONWorkoutObject = JSON.parse(JSONString);
  return JSONWorkoutObject.workout // returns an array of exercise objects
}

function makeWorkoutTable(workoutList) {
  const container = document.getElementById('workoutTableContainer');
  const table = document.createElement('table'); // object's id="table"
  table.classList.add('workout-table'); // makes the object's class="workout-table"

  // MAKES TABLE HEAD
  const thead = document.createElement('thead'); // table header group
  const headerRow = document.createElement('tr'); // table row

    // find a way to get all item properties from JSON object and use that list
  const headers = ['Workout Name', 'Duration', 'Description'];

  headers.forEach((headerText) => {
    const th = document.createElement('th'); // single table header
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // MAKES TABLE BODY
  const tbody = document.createElement('tbody');
  for (const exercise of workoutList) {
    alert("Iterating through exercise in workout list")
    const row = document.createElement('tr');

    const properties = ['exercise', 'time', 'description'];

    properties.forEach((propName) => {
      const cell = document.createElement('td'); // table data
      cell.textContent = exercise[propName];
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  };

  table.appendChild(tbody);
  container.appendChild(table);
}

export async function generateWorkout() {
  // Get the user input from the input field
  const height = document.getElementById('height').value.toString();
  const sex = document.getElementById('sex').value.toString();
  const weight = document.getElementById('weight').value.toString();
  const minutes = document.getElementById('minutes').value.toString();
  const muscles = document.getElementById('muscles').value.toString();

  const prompt = generatePrompt(height, sex, weight, minutes, muscles);

  // Call getChatCompletion with user input
  document.getElementById('loader').style.display = 'inline-block';
  const GPTresponse = await getChatCompletion(prompt);
  document.getElementById('loader').style.display = 'none';

  const workoutObject = JSON.parse(GPTresponse);

  console.log(GPTresponse)
  console.log(workoutObject);
  // console.log("Workout object index 1 =" + workoutObject[1]);
  // const properties = Object.keys(workoutObject);
  // console.log(properties);

  // const result = "{\n \"workout\": [\n {\n \"exercise\": \"Squats\",\n \"time\": \"5 minutes\",\n \"description\": \"Stand with your feet shoulder-width apart. Lower your body as if sitting back into a chair, keeping your chest up and knees in line with your toes. Push through your heels to return to the starting position.\"\n },\n {\n \"exercise\": \"Lunges\",\n \"time\": \"5 minutes\",\n \"description\": \"Stand with your feet hip-width apart. Step forward with one leg, lowering your body until your front knee is at a 90-degree angle. Push through your front heel to return to the starting position and repeat with the other leg.\"\n },\n {\n \"exercise\": \"Glute Bridges\",\n \"time\": \"5 minutes\",\n \"description\": \"Lie on your back with your knees bent and feet flat on the ground. Lift your hips off the floor, squeezing your glutes at the top. Lower your hips back down and repeat.\"\n },\n {\n \"exercise\": \"Calf Raises\",\n \"time\": \"5 minutes\",\n \"description\": \"Stand with your feet hip-width apart. Rise up onto your toes, lifting your heels off the ground. Hold for a moment, then lower your heels back down and repeat.\"\n },\n {\n \"exercise\": \"Step-ups\",\n \"time\": \"5 minutes\",\n \"description\": \"Find a step or platform. Step one foot onto the step, then drive through that foot to lift your body up onto the step. Step back down and repeat with the other leg.\"\n },\n {\n \"exercise\": \"Wall Sits\",\n \"time\": \"5 minutes\",\n \"description\": \"Stand with your back against a wall and slide down until your thighs are parallel to the ground. Hold this position, keeping your core engaged and your back against the wall.\"\n }\n ]\n}"

  // const workoutList = parseJSONWorkout(workoutString);
  // makeWorkoutTable(workoutList);
}



document.getElementById('myButton').addEventListener('click', function() {
  generateWorkout();
});