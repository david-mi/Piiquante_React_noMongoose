import sauceSchema from '../schemas/sauceSchema.js';
import fs from 'fs/promises';
import Connection from '../../database.js';
import { ObjectId } from 'mongodb';


class Sauce {

  constructor(userIdToken) {
    this.userId = userIdToken;
  }

  get dbSauces() {
    return Connection.getCollection('sauces');
  }

  getImageUrl(req) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    this.imageUrl = imageUrl;
  }

  async dbAdd() {
    await this.dbSauces.insertOne(this);
  }

  async dbFind(dbSauceId) {
    const foundDbSauce = await this.dbSauces.findOne(dbSauceId);

    if (!foundDbSauce) {
      throw ({ message: "Cette sauce n'existe pas" });
    }

    return foundDbSauce;
  }

  async validate(unParsedSauce) {
    const parsedSauce = JSON.parse(unParsedSauce);
    await sauceSchema.validate({ ...parsedSauce, imageUrl: this.imageUrl });
    return parsedSauce;
  }

  async set(data) {
    this.name = data.name;
    this.manufacturer = data.manufacturer;
    this.description = data.description;
    this.mainPepper = data.mainPepper;
    this.heat = data.heat;
    this.likes = 0;
    this.dislikes = 0;
    this.usersLiked = [];
    this.usersDisliked = [];
  }

  async deleteCurrentFile() {
    const regex = /images\/.+/;
    const path = this.imageUrl.match(regex)[0];
    await fs.unlink(path);
  }
}

export default Sauce;