# Piiquante noMongoose
##  Description
*Reprise du projet 6 du parcours de Développeur Web d'OpenClassRooms (faire une api sécurisée pour une application d'avis gastronomiques) avec quelques contraintes :*

 - Ne pas utiliser Mongoose
 - Utiliser ses propres classes

## Installation

 - `npm i`
 - supprimer l'extension `.example` du fichier `.env.example` situé à la racine du projet
 - Renseigner les valeurs pour chaque variable d'environnement
 
|Variable d'environnement |Rôle|
|--|--|
|`DB_USERNAME`|Le nom d'un utilisateur de votre cluster MongoDB ayant les droits d'écriture|
|`DB_PW`|Le mot de passe associé à cet utilisateur|
|`DB_NAME`|Le nom de la base de donnée qui sera utilisée pour ce projet (sera crée par défaut si elle n'existe pas)|
|`DB_URL`|L'url de votre cluster MongoDB|
|`EMAIL_SECRET`|La clé secrète qui sera utilisée pour chiffrer et déchiffrer un email|
|`TOKEN_SECRET`|La clé secrète du token renvoyée lors de l'authentification|