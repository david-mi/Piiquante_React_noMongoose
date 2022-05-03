import Sauce from './Sauce.js';
import sauceSchema from '../schemas/sauceSchema.js';
import SauceDb from './SauceDb.js';

/**
 * Va regrouper les méthodes pour l'édition et la suppression de sauces.
 * 
 * @method dbReplace remplace une sauce dans la base de donnée par une nouvelle
 * @method validateEdit Vérifie le format des données via un schéma yup
 * @method delete supprime une sauce de la base de donnée 
 * @method setEdited ajoute les informations de la sauce à l'instance
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

  /**
   * @async supprime une sauce de la base de donnée
   * @method getOne regarde si la sauce visée existe 
   * @param {ObjectId} dbSauceId 
   */

  async delete(dbSauceId) {
    const foundDbSauce = await SauceDb.getOne(dbSauceId);
    await this.dbSauces.deleteOne({ _id: dbSauceId });
    await this.handleFileDelete(foundDbSauce.imageUrl);
  }
}

export default SauceEdit;