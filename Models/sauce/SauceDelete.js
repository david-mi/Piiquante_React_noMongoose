import { Sauce, SauceDb } from '../modelsIndexes.js';

/**
 * Regroupe les méthodes communes pour la suppression des sauces
 */

class SauceDelete extends Sauce {
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

export default SauceDelete;