//CLASSES & SCHEMAS
import { Sauce, sauceSchema } from '../modelsIndexes.js';

/**
 * Regroupe les méthodes communes pour l'édition des sauces
 */

class SauceEdit extends Sauce {

  /**
   * @async Remplace une sauce dans la base de donnée par une autre
   * @param {ObjectId} dbSauceId 
   */

  async dbReplace(dbSauceId) {
    await this.dbSauces.replaceOne({ _id: dbSauceId }, this);
  }

  /**
   * @async Vérifie le format des données via un schéma yup
   * @param {object} dataBaseSauce la sauce trouvée dans la base de donnée
   * @param {object} parsedSauce les nouvelles données de sauce parsées
   * @returns {object} les informations complètes de la sauce mise à jour
   */

  async validateEdit(dataBaseSauce, parsedSauce) {
    const { name, manufacturer, description, mainPepper, heat } = parsedSauce;
    const updatedSauce = { ...dataBaseSauce, name, manufacturer, description, mainPepper, heat };
    await sauceSchema.validate(updatedSauce);

    return updatedSauce;
  }

  /**
   * @constructs this
   * @param {object} data les données de la sauce
   */

  setEdited(data) {
    this.name = data.name;
    this.manufacturer = data.manufacturer;
    this.description = data.description;
    this.mainPepper = data.mainPepper;
    this.heat = data.heat;
    this.imageUrl ??= data.imageUrl;
    this.likes = data.likes;
    this.dislikes = data.dislikes;
    this.usersLiked = data.usersLiked;
    this.usersDisliked = data.usersDisliked;
  }
}

export default SauceEdit;