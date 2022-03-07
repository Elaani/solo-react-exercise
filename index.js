const express = require("express");
const app = express();
const path = __dirname + "/client/public/";
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// fetches representatives using the requested state
async function fetchRepresentatives(req, res, next) {
  stateSelection = req;
  fetch(
    `http://whoismyrepresentative.com/getall_reps_bystate.php?state=${stateSelection}&output=json`
  ).then(async (response) => {
    try {
      const data = await response.json();
      let list = data.results;
      res.send(list);
    } catch (error) {
      console.log("Error!");
      console.error(error);
    }
  });
}

// fetches senators using the requested state
async function fetchSenators(req, res, next) {
  stateSelection = req;
  fetch(
    `http://whoismyrepresentative.com/getall_sens_bystate.php?state=${stateSelection}&output=json`
  ).then(async (response) => {
    try {
      const data = await response.json();
      let list = data.results;
      res.send(list);
    } catch (error) {
      console.log("Error!");
      console.error(error);
    }
  });
}

// routes
app.get("/fetchSens/:tagId", (req, res) => {
  fetchSenators(req.params.tagId, res);
});
app.get("/fetchReps/:tagId", (req, res) => {
  fetchRepresentatives(req.params.tagId, res);
});
app.get("/:tagId", (req, res) => {
  res.send("tagId is set to " + req.params.tagId);
});

// listen to server 3001
app.listen(3001);
