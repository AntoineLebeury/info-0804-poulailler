# PROJET-INFO0804-APPLI


## Avoir l'application
- Sur android:
	- Faire un compte sur https://expo.io/signup
	- Aller sur : https://expo.io/@dylanbaptiste/projects/cote-cote-appli
	- Scanner le qrcode

- Sur iPhone: Apple bloque la possibilité de faire comme sur Android (et comme j'ai pas 100€ pour le mettre sur l'AppStore on va faire autrement) (Si vous voulez juste tester sur navigateur ignorez l'étapes concerant Expo GO)
	- Installer NodeJS : https://nodejs.org/fr/
	- Installer Expo GO sur l'iphone : https://apps.apple.com/fr/app/expo-go/id982107779
	- A la racine du projet:
		- Installer les packages avec: `npm i`
		- Démarrer : `npm run start`
		- Une page s'ouvre dans le navigateur, cliquez sur "Run in web browser" ou scannez le qrcode avec l'aphone pour ouvrir l'app dans Expo GO


## Utilisation

Pages:
- Porte:
	- Rafraichissement: avec un swipe down
- Cam:
	- Rafraichissement: avec un swipe down
	- Cliquez sur le lien pour ouvrir dans le navigateur par defaut la camera
- BDD:
	- Rafraichissement: avec un swipe down
- Paramètres:
	- Configuration pour protocol, ip et port de l'API
	- use fake request: choisir ou non d'envoyer les requetes vers l'api (ou de simuler les requetes pour pouvoir avoir le comportement de l'application sans API)

## Environement DEV
Aller à la racine 
insatllation des packages:

`npm i`

démarrer en dev:

`npm run start`

démarrer sur le navigateur directement:

`npm run web`