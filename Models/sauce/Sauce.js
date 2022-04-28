import sauceSchema from '../schemas/sauceSchema.js';
import fs from 'fs/promises';
import Connection from '../../database.js';

/**
 * Va regrouper les méthodes communes pour la gestion des sauces
 * 
 * @constructor L'userId contenu dans le payload du token de l'utilisateur
 * @getter dbSauces retourne la collection sauces
 * @method getImageUrl Retourne l'url de l'image stockée dans le dossier images
 * @method dbAdd Ajoute une sauce dans la base de donnée
 * @method dbFind Cherche si une sauce est présente dans la base de donnée
 * @method validate Vérifie le format des données via un schéma yup
 * @method set Ajoute les informations de l'utilisateur au constructeur
 * @method handleFileDelete Supprime une image du dossier images
 */

class Sauce {

  /**
   @param {string} userIdToken L'userId présent dans le payload du token 
   * de l'utilisateur ayant fait la requête
   */

  constructor(userIdToken) {
    this.userId = userIdToken;
  }

  /** @returns La collection sauces */

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

  /** @async Ajoute une sauce dans la base de données */

  async dbAdd() {
    await this.dbSauces.insertOne(this);
  }

  /**
   * @async Cherche une sauce dans la base de données via l'id passé en paramètres
   * @param {string} dbSauceId id de la sauce stockée dans la base de données
   * @returns {string} La sauce trouvée dans la base de donnée
   * @throws une exception si la sauce n'est pas trouvée dans la base de donnée
   */

  async dbFind(dbSauceId) {
    const foundDbSauce = await this.dbSauces.findOne(dbSauceId);
    console.log({ foundDbSauce });

    if (!foundDbSauce) {
      throw ({ message: "Cette sauce n'existe pas", status: 404 });
    }

    return foundDbSauce;
  }

  /**
   * @async parse les données
   * 
   * @param {object} unParsedSauce 
   * @returns 
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
    const regex = /images\/.+/;
    const path = fileUrl.match(regex)[0];
    await fs.unlink(path);
  }
}

export default Sauce;