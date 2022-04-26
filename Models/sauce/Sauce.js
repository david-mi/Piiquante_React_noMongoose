import { addOneSauce } from '../../controllers/sauceController.js';
import sauceSchema from '../schemas/sauceSchema.js';

class Sauce {

  constructor(userIdToken) {
    this.userId = userIdToken;
  }

  getImageUrl(req) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log({ imageUrl });
    this.imageUrl = imageUrl;
  }

  async addOneSauce(sauce) {
    const parsedSauce = JSON.parse(sauce);
    await sauceSchema.validate({ ...parsedSauce, imageUrl: this.imageUrl });

    const { name, manufacturer, description, mainPepper, heat } = parsedSauce;
    this.name = name;
    this.manufacturer = manufacturer;
    this.description = description;
    this.mainPepper = mainPepper;
    this.heat = heat;
  }

}

export default Sauce;