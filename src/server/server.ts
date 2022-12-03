import express, { response } from "express"
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai"

require('dotenv').config()
const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api', async(req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a ${req.body.wordCount} word discussion post on ${req.body.title} by ${req.body.author} addressing the question ${req.body.writingPrompt}`,
      temperature: 0.85,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.send({ message: response.data.choices[0].text })
  }
  catch (error) {
    return error
  }
})

app.listen(port, () => {
    console.log(`Express is listening at port ${port}`);
})