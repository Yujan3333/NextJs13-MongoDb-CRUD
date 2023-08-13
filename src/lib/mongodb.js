// mongodb.js
// const mongoose = require('mongoose');

// import mongoose from 'mongoose';
// const uri = process.env.MONGODB_URI;

// async function connectMongoDB() {
//   return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// }

// module.exports = connectMongoDB;


// utils/mongodb.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let db;

export default async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(uri, options);
    console.log("db connected")
    db = client.db('mongolab');
    console.log("db name is :",db.databaseName);
  }
  return { client, db };
}

