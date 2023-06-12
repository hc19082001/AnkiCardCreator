const express = require("express");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const CHATGPT_API_KEY = "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";

const configuration = new Configuration({
  apiKey: CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/:word", async (req, res) => {
  fetch("https://chatgpt-api.shn.hk/v1/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello, how are you?" }],
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});

app.listen(3000, () =>
  console.log(
    `>>>> Server is running on port is: http://localhost:${3000}/ <<<`
  )
);
