//PACKAGES
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

//ENV
config();
const { DB_USERNAME: USER, DB_PW: PW, DB_NAME: NAME, DB_URL: URL } = process.env;

//MONGODB INFOS
const uri = `mongodb+srv://${USER}:${PW}@${URL}/${NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

/**
 * Gère la connection sur la base de donnée mongoDB et l'accès aux collections
 */

class Connection {

  /**
   * Gestion de la connexion à la base de donnée mongoDB
   */

  static async connect() {
    if (this.database) return this.database;
    try {
      await client.connect();
      console.log("Connected to database");
      const database = client.db(NAME);
      this.database = database;
    }
    catch (err) {
      console.log("Connection Failed");
    }
  }

  /**
   * @param {string} collection nom de la collection désirée
   * @returns la collection correspondante
   */

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
