require("dotenv").config();
const express = require("express");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "",
});
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  let content = await main();
  res.send(content);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content:
          "How to write an SEO friendly blog article? tell me in concise and short",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

main();
