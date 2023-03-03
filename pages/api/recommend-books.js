import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: `Recommend a book related to ${req.body.query}`,
        temperature: 0.5,
        max_tokens: 60,
        n: 1,
        stop: null,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const books = response.data.choices[0].text
      .match(/\".+?\"/g)
      .map((book) => book.replace(/\"/g, ""));
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while recommending books.");
  }
}
