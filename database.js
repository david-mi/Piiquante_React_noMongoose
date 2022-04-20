import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

// ENV
config();
const { DB_USERNAME: USER, DB_PW: PW, DB_NAME: NAME, DB_URL: URL } = process.env;

// MONGODB INFOS
const uri = `mongodb+srv://${USER}:${PW}@${URL}/${NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


class Connection {

  static async connect() {
    if (this.database) return this.database;
    try {
      await client.connect();
      console.log("Connected to database");
      const database = client.db("practice");
      this.database = database;
      return this.database;
    }
    catch (err) {
      console.log("Connection Failed");
    }
  }

  static getCollection(collection) {
    try {
      const getCollection = this.database.collection(collection);
      this[collection] = getCollection;
      return this[collection];
    }
    catch (err) {
      console.log(err);
    }


  }
}



export default Connection;
