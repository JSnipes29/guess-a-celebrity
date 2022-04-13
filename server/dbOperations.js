// Import MongoDB driver
const { MongoClient } = require('mongodb');

// Connect to the DB and return the connection object
const connect = async (url) => {
  try {
    const conn = (await MongoClient
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    console.log(`Connected to the database: ${conn.databaseName}`);
    return conn;
  } catch (err) {
    console.error(err);
    throw new Error('could not connect to the db');
  }
};

// Add a player to the DB
async function addPlayer(db, newPlayer) {
  try {
    const result = await db.collection('Player').insertOne(newPlayer);
    console.log(`Created player with id: ${result.insertedId}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not add a player');
  }
}

// Get player by name
async function getPlayer(db, name) {
  try {
    // retrieve the player with the specified name in the collection and convert the cursor
    const results = await db.collection('Player').findOne({ name });
    return results;
  } catch (err) {
    console.error(err);
    throw new Error('could not retrieve player');
  }
}

// Update player score
async function updatePlayer(db, name, score) {
  let badScore = false;
  try {
    const prevScore = (await db.collection('Player').findOne({ name })).score;
    if (prevScore > score) {
      badScore = true;
      throw new Error('new score is not bigger than old score');
    }
    const results = await db.collection('Player').updateOne({ name }, { $set: { score } });
    return results;
  } catch (err) {
    console.error(err);
    if (badScore) {
      throw new Error('new score is not bigger than old score');
    }
    throw new Error('could not update score');
  }
}

// Delete player
async function deletePlayer(db, name) {
  try {
    const results = await db.collection('Player').deleteOne({ name });
    return results;
  } catch (err) {
    console.error(err);
    throw new Error('could not delete player');
  }
}

// Get leaders
async function getLeaders(db) {
  try {
    // retrieve k players in the collection with the top k scores
    const results = await db.collection('Player').find().sort({ score: -1, name: 1 }).limit(3)
      .toArray();
    return results;
  } catch (err) {
    console.error(err);
    throw new Error('could not retrieve leaders');
  }
}

// Get question
async function getQuestion(db, id) {
  try {
    // retrieve question with id
    const results = (await db.collection('Question').find({ id }).toArray())[0];
    return results;
  } catch (err) {
    console.error(err);
    throw new Error('could not retrieve question');
  }
}

module.exports = {
  connect, addPlayer, getPlayer, updatePlayer, deletePlayer, getLeaders, getQuestion,
};
