//PACKAGES
import fs from 'fs/promises';

//CLASSES
import Connection from '../../database.js';

//SCHEMAS
import { sauceSchema } from '../modelsIndexes.js';

/**
 * Regroupe les méthodes communes pour la gestion des sauces
 */

class Sauce {

  /**
   @param {string} userIdToken L'userId présent dans le payload du token 
   * de l'utilisateur ayant fait la requête
   */

  constructor(userIdToken) {
    this.userId = userIdToken;
  }

  /**
   * @getter retourne La collection sauces
   */

  get dbSauces() {
    return Connection.getCollection('sauces');
  }

  /** 
   * Récupère l'url complète de l'image enregistrée via @multer
   * 
   * @param {object} req La requête en cours
   * @constructs imageUrl
   */

  getImageUrl(req) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    this.imageUrl = imageUrl;
  }

  /**
   *  @async Ajoute une sauce dans la base de données
   */

  async dbAdd() {
    await this.dbSauces.insertOne(this);
  }

  /**
   * @async parse les données et les valide via un schéma yup
   * 
   * @param {object} unParsedSauce 
   * @returns l'objet contenant les informations de la sauce parsé et vérifié
   */

  async validate(unParsedSauce) {
    const parsedSauce = JSON.parse(unParsedSauce);
    await sauceSchema.validate({ ...parsedSauce, imageUrl: this.imageUrl });
    return parsedSauce;
  }

  /**
   * @constructs this ajoute les informations d'un user
   * dans le constructeur, initialisation des tableaux et variables likes & dislikes
   * @param {object} data objet contenant les infos d'un user
   */

  set(data) {
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

  /**
   * @async supprime l'image du dossier images
   * @param {string} fileUrl url de l'image récupéré dans le document user
   */

  async handleFileDelete(fileUrl) {
    if (fileUrl) {
      const regex = /images\/.+/;
      const path = fileUrl.match(regex)[0];
      await fs.unlink(path);
    }
  }
}

export default Sauce;