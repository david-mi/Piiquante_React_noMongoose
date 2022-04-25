import { addOneSauce } from '../../controllers/sauceController.js';
import sauceSchema from '../schemas/sauceSchema.js';

class Sauce {

  constructor(tokenUserId) {
    this.tokenUserId = tokenUserId;
  }

  async addOneSauce(sauce) {
    const parsedSauce = JSON.parse(sauce);
    await sauceSchema.validate({ parsedSauce });
  }

}

export default Sauce;