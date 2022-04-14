/* eslint-disable import/no-extraneous-dependencies */
// Create express app
const express = require('express');

const webapp = express();

// import environment variables
require('dotenv').config();

// declare database object
let db;

// import path
const path = require('path');

// import CORS
const cors = require('cors');

// import database functions
const lib = require('./dbOperations');

// MongoDB URL
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.non3f.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);
// Tell express to use cors
webapp.use(cors({ credentials: true, orgin: true }));

// Tell express where to find static files
webapp.use(express.static(path.join(__dirname, './client/build')));
// Define all endpoints as specified in REST API

// Add Player endpoint
webapp.post('/login', async (req, resp) => {
  // check the name was provided
  if (!req.body.name || req.body.name.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
  }
  try {
    const result = await lib.addPlayer(db, { name: req.body.name, score: 0 });
    // Send the response
    resp.status(201).json({ message: `Player with id ${JSON.stringify(result.insertedId)} added` });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Get player endpoint
webapp.get('/player/:name', async (req, resp) => {
  try {
    const results = await lib.getPlayer(db, req.params.name);
    resp.status(200).json(results);
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Update player endpoint
webapp.put('/player/:name', async (req, resp) => {
  try {
    const results = await lib.updatePlayer(db, req.params.name, parseInt(req.body.score, 10));
    resp.status(200).json(results);
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Delete player endpoint
webapp.delete('/player', async (req, resp) => {
  try {
    const results = await lib.deletePlayer(db, req.body.name);
    resp.status(200).json(results);
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Get leaders endpoint
webapp.get('/leaders', async (_req, resp) => {
  try {
    const results = await lib.getLeaders(db);
    resp.status(200).json(results);
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Get question endpoint
webapp.get('/question/:id', async (req, resp) => {
  try {
    const results = await lib.getQuestion(db, parseInt(req.params.id, 10));
    resp.status(200).json(results);
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Root endpoint
webapp.get('/', (_req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(_dirname, './client/build/index.html'));
  // res.json({ message: 'Welcome to HW5 Backend' });
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 5002;
webapp.listen(port, async () => {
  db = await lib.connect(url);
  console.log(`Server running on port:${port}`);
});

module.exports = webapp; // export for testing purposes
