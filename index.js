require('dotenv').config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  organization: "org-f2NApAOmy3mObCzhBPi4XHnw",
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

console.log(openai)