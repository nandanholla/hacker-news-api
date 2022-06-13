const fetch = require("node-fetch");

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";
const STORY_URL = `${BASE_URL}item/`;

// function to fetch ids
const getIds = async (type) => {
  try {
    const response = await fetch(`${BASE_URL + type}stories.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// function to fetch stories
const getStories = async (ids) => {
  try {
    return Promise.all(
      ids.map((id) => {
        return fetch(`${STORY_URL + id}.json`)
          .then((data) => data.json())
          .then((stories) => {
            const { id, by, url, title, time } = stories;
            return {
              id: id,
              by: by,
              url: url,
              title: title,
              time: time,
            };
          });
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const stories = async (req, res, type) => {
  req.params === "top"
    ? (type = "top")
    : req.params === "new"
    ? (type = "new")
    : (type = "best");
  try {
    const ids = await getIds(type);
    const story = await getStories(ids);
    res.send(story);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { stories };
