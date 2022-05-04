import { Sauce } from '../modelsIndexes.js';

/**
 * Regroupe les méthodes communes pour la suppression des sauces
 */

class SauceVote extends Sauce {

  /**
   * Met à jour les données concernant le vote récupéré dans le body
   * 
   * @param {object} dbSauce la sauce trouvée dans la base de donnée
   * @param {number} voteValue la valeur du vote trouvé dans le body
   */

  async handleVote(dbSauce, voteValue) {
    const { _id, usersLiked, usersDisliked } = dbSauce;

    this.usersLiked = usersLiked.filter(userId => userId !== this.userId);
    this.usersDisliked = usersDisliked.filter(userId => userId !== this.userId);
    this.likes = this.usersLiked.length;
    this.dislikes = this.usersDisliked.length;

    switch (voteValue) {
      case 1:
        this.likes++;
        this.usersLiked.push(this.userId);
        break;
      case -1:
        this.dislikes++;
        this.usersDisliked.push(this.userId);
    }

    delete this.userId;
    this.dbSauces.updateOne({ _id }, { $set: { ...this } });
  }
}

export default SauceVote;