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
  // {
  //   letter: 'a'
  //   listWord: [
  //  {
  //           "headerWord": "babble",
  //           "family": [
  //               "babble",
  //               "babbled",
  //               "babbles",
  //               "babbling"
  //           ]
  //   }
  // ]
  // }
  const wordFamilyFilter1 = lerrterRelativeArr[0].listWord.filter((wordObj) => {
    return wordObj.headerWord.includes(
      w.slice(0, (word.length / 2 + 1).toFixed(0))
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

app.listen(3000, () =>
  console.log(
    `>>>> Server is running on port is: http://localhost:${3000}/ <<<`
  )
);
