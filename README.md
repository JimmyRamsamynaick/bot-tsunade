# Bot Tsunade

Bot Discord avec système de roue de la fortune et gestion de points.

## Installation

1. Installer Node.js (version 16.9.0 ou plus récente)
2. Cloner ou télécharger ce dépôt
3. Ouvrir un terminal dans le dossier du projet
4. Installer les dépendances :
   ```bash
   npm install
   ```
5. Configurer le bot :
   - Ouvrir le fichier `config.json`
   - Remplacer les valeurs par vos propres informations :
     - `token` : Token de votre bot Discord
     - `clientId` : ID de votre application bot
     - `guildId` : ID du serveur où vous voulez utiliser le bot
     - `ownerId` : Votre ID Discord (propriétaire du bot)
6. (Optionnel) Modifier les récompenses dans `rewards.json`
7. Déployer les commandes slash :
   ```bash
   npm run deploy
   ```
8. Lancer le bot :
   ```bash
   npm start
   ```

## Commandes

- `/help` : Affiche la liste des commandes
- `/points [utilisateur]` : Voir votre solde ou celui d'un autre utilisateur
- `/roue <utilisateur>` : Faire tourner la roue (propriétaire uniquement)
- `/managepoints <utilisateur> <action> <montant>` : Gérer les points d'un utilisateur (propriétaire uniquement)

## Structure du projet

```
bot-tsunade/
├── commands/          # Dossier des commandes slash
├── events/            # Dossier des événements
├── utils/             # Fonctions utilitaires
├── data/              # Dossier de stockage des données (généré automatiquement)
├── config.json        # Fichier de configuration
├── rewards.json       # Récompenses de la roue
├── deploy-commands.js # Script de déploiement des commandes
├── index.js           # Fichier principal du bot
└── package.json       # Informations du projet et dépendances
```
