const express = require("express");
const fw = require("./words.json");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const CHATGPT_API_KEY = "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";

const configuration = new Configuration({
  apiKey: CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.status(200).json(fw[1]);
});

app.get("/wordFamily/:word", async (req, res) => {
  const { word } = req.params;
  let w = word;
  if (w.startsWith("un") && w.length > 2) {
    w = w.slice(2);
  }
  if (w.startsWith("mis") || (w.startsWith("dis") && w.length > 3)) {
    w = w.slice(3);
  }
  const lerrterRelativeArr = fw.filter((lt) => lt.letter === w[0]);
  const wordFamilyFilter1 = lerrterRelativeArr[0].listWord.filter((wordObj) => {
    return wordObj.headerWord.includes(
      w.slice(0, (word.length / 2).toFixed(0))
    );
  });

  const finalWF = [];
  wordFamilyFilter1.forEach((wordObj) => {
    wordObj.family.forEach((wordObj2) => {
      wordObj2 === word || finalWF.push(wordObj2);
    });
  });

  if (finalWF.length === 0) {
    res.status(400).json({ message: "Not found" });
  } else {
    res.status(200).json(finalWF);
  }
});

app.get("/examples/:word", async (req, res) => {
  console.log(req.params.word);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Give me 10 english sentences following these rules:
                        1. The sentence must have this word: '${req.params.word}, word '${req.params.word}' must be placed in <b></b> tag, Example: 'I love <b>my parents</b> very much',
                        2. Translate each the sentence to Vietnamese, mush abide by the following structure: [example in english] - [translate in vietnamese]
                        3. No wrap to new line in a sentence
                        Example: 'Drinking water can <b>alleviate</b> hunger. - Uống nước có thể giảm đói.'`,
      },
    ],
  });
  const content = completion.data.choices[0].message.content;
  const examples = content
    .trim()
    .split("\n")
    .map((item, index) => item.split(`${index + 1}. `)[1])
    .map((item) => ({
      en: item.split(" - ")[0],
      vi: item.split(" - ")[1],
    }));
  res.json(examples);
});

app.listen(3000, () =>
  console.log(
    `>>>> Server is running on port is: http://localhost:${3000}/ <<<`
  )
);
