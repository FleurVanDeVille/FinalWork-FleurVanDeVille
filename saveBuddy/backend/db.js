const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.DB_URL);

let database;

async function connectDB() {
	if (!database) {
		await client.connect();
		database = client.db(process.env.DB_NAME);
		console.log("Connected to MongoDB");
	}

	return database;
}

module.exports = connectDB;