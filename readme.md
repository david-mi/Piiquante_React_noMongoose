# Piiquante noMongoose
##  Description
*Reprise du projet 6 du parcours de Développeur Web d'OpenClassRooms (Faire une api sécurisée pour une application d'avis gastronomiques) avec quelques contraintes :*

 - Ne pas utiliser Mongoose
 - Utiliser ses propres classes

## Installation

 - `npm i`
 - supprimer l'extension .example du fichier ".env.example" situé à la racine du projet
 - Renseigner les valeurs pour chaque variable d'environnement
 
|Variable d'environnement |rôle|
|--|--|
|`DB_USERNAME`|le nom d'un utilisateur de votre cluster MongoDB Atlas ayant les droits d'écriture|
|`DB_PW`|le mot de passe associé à cet utilisateur|
|`DB_NAME`|le nom de la base de donnée qui sera utilisé pour ce projet (sera crée par défaut si elle n'existe pas)|
|`DB_URL`|L'url de votre cluster|
|`EMAIL_SECRET`|La clé secrète qui sera utilisée pour chiffrer et déchiffrer un email|
|`TOKEN_SECRET`|La clé secrète du token renvoyé lors de l'authentification|