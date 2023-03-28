const express = require("express");
const bodyParser = require("body-parser");
const { createWorker } = require("tesseract.js");

const app = express();

// Parse JSON and URL-encoded query parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define POST route for extracting text from an image URL
app.post("/extract-text", async (req, res) => {
  const imageUrl = req.body.imageUrl;

  const worker = await createWorker({
    logger: (m) => console.log(m),
  });

  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(imageUrl);
  console.log(text);
  await worker.terminate();
  res.json(text);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
