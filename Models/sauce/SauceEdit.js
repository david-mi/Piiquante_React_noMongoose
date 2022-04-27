import Sauce from './Sauce.js';
import sauceSchema from '../schemas/sauceSchema.js';
import Connection from '../../database.js';

class SauceEdit extends Sauce {

  constructor(userIdToken) {
    super(userIdToken);
  }

  async dbReplace(dbSauceId) {
    const dbSauces = Connection.getCollection('sauces');
    await dbSauces.replaceOne({ _id: dbSauceId }, this);
  }

  async validateEdit(dataBaseSauce, parsedSauce) {
    const { name, manufacturer, description, mainPepper, heat } = parsedSauce;
    const updatedSauce = { ...dataBaseSauce, name, manufacturer, description, mainPepper, heat };
    await sauceSchema.validate(updatedSauce);

    return updatedSauce;
  }

  setEdited(parsed) {
    this.name = parsed.name;
    this.manufacturer = parsed.manufacturer;
    this.description = parsed.description;
    this.mainPepper = parsed.mainPepper;
    this.heat = parsed.heat;
    this.imageUrl = this.imageUrl || parsed.imageUrl;
    this.likes = parsed.likes;
    this.dislikes = parsed.dislikes;
    this.usersLiked = parsed.usersLiked;
    this.usersDisliked = parsed.usersDisliked;
  }
}

export default SauceEdit;