//CLASSES
import Connection from '../../database.js';

/**
 * Regroupe les méthodes statiques pour les interactions avec la collection sauces
 */

class SauceDb {

  static get collection() {
    return Connection.getCollection('sauces');
  }

  /** 
   * @async
   * @static
   * Récupère toutes les sauces stockées en base de donnée 
   * renvoie un tableau vide si aucune sauce n'est stockée
   */

  static async getAll() {
    const sauces = await SauceDb.collection.find().toArray();
    return sauces;
  }

  /** 
   * @async
   * @static
   * Récupère une sauce selon une id donnée
   * 
   * @param {ObjectId} dbSauceId l'id de la sauce cherchée
   * @returns {object} La sauce trouvée dans la base de donnée
   * @throws une exception si la sauce n'est pas trouvée dans la base de donnée
   */

  static async getOne(dbSauceId) {
    const foundDbSauce = await SauceDb.collection.findOne(dbSauceId);
    if (!foundDbSauce) {
      throw ({ message: "Cette sauce n'existe pas", status: 404 });
    }
    return foundDbSauce;
  }
}

export default SauceDb;