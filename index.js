const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const { stories } = require("./api");

app.get('/', (req, res) => {
  res.send('/top - topStories, /new - newStories, /best - bestStories')
})

app.get("/top", stories);

app.get("/new", stories);

app.get("/best", stories);

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
