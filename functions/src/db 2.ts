import { MongoClient, Db } from "mongodb";
import * as functions from "firebase-functions";

// Get MongoDB URI from Firebase Config
const mongoURI = functions.config().mongo.uri;

if (!mongoURI) {
  throw new Error(" MongoDB URI is missing. Set it in Firebase.");
}

// Ensure TLS 1.2 and prevent SSL issues
const client = new MongoClient(mongoURI, {
  tls: true, 
  tlsAllowInvalidCertificates: false, // Ensures secure connection
  minHeartbeatFrequencyMS: 5000, // Adjusts heartbeat to prevent timeouts
  serverSelectionTimeoutMS: 15000, // Extends server selection timeout
  retryWrites: true, // Ensures MongoDB Atlas compatibility
});

let db: Db;

export const getClient = async () => {
  try {
    if (!db) {
      await client.connect();
      db = client.db("TaskList"); // Change to your actual database name
      console.log(" MongoDB connected");
    }
    return db;
  } catch (err) {
    console.error(" MongoDB Connection Error:", err);
    throw err;
  }
};
