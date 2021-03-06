#from sense_hat import SenseHat
#import mysql.connector
from datetime import datetime
import time
import requests
import socket
import unittest2 as unittest

serveur = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('',50000))
serveur.listen(5)
porte_ouverte = 0

#Test unitaire
class TestFermeturePorte(unittest.TestCase):
    def testfermeturedenied(self):
        porte_ouverte=0
        self.assertEqual(fermeture_porte(), "Porte deja fermer")
    def testfermeturesuccess(self):
        porte_ouverte=1
        self.assertEqual(fermeture_porte(), "Porte fermee")
    def testFermetureMauvaisStatueError(self):
        porte_ouverte=3
        self.assertEqual(fermeture_porte(), "Une erreur est survenu")


#Fonction permettant de savoir le statu de la porte 0 = Ferme; 1 = ouverte
def statue_porte():
    return porte_ouverte

#Fonction pour ouvrir la porte
def ouverture_porte():
    #On verifie que la porte est bien fermer
    if statue_porte()==0:
        global porte_ouverte
        porte_ouverte=1
        return "Porte ouverte"
    #Sinon si elle est déja ouverte on lui renvoie quelle est ouverte
    if statue_porte()==1:
        return "Porte deja ouverte"
    #Sinon il y'a ut un problème avec la récupération du statue de la porte
    else:
        return "Une erreur est survenu"

#Fonction pour fermer la porte
def fermeture_porte():
    #On verifie que la porte est bien ouverte
    if statue_porte()==1:
        global porte_ouverte
        porte_ouverte=0
        return "Porte fermee"
    #Sinon si elle est déja fermer on lui renvoie quelle est fermer
    if statue_porte()==0:
        return "Porte deja fermer"
    #Sinon il y'a ut un problème avec la récupération du statue de la porte
    else:
        return "Une erreur est survenu"
    
#Fonction renvoyant les données capte par le raspberry ainsi que l'heure du captage
#def captage():
    #temp = sense.get_temperature()
    #hum = sense.get_humidity()
    #pres = sense.get_pressure()
    #now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    #return (temp,hum, pres, now)

#Le programme vas toujours tourner en attende de demande de l'api
while True:
    #On vas recuper l'heure de lever et coucher de soleil d'aujourd'hui pour pouvoir fermer/ouvrir la porte si besoin
    soleil = requests.get("https://api.sunrise-sunet.org/json?lat=49.25&lng=4.0333")
    soleil_list = soleil.json()
    lever = soleil_list["results"]['sunrise']
    coucher = soleil_list["results"]['sunset']
    
    #Si on recoit un demande d'un client dans notre cas l'api
    client, infosClient= serveur.accept()
    print("Client connecte. Adresse "+ infosClient[0])
    requete = client.recv(255)
    print(requete.decode("utf-8"))
    #Je regarde le contenu de son message pour savoir ce qu'il me demande et lui renvoie une réponse adéquat
    
    #Si c'est 1 je lui renvoie le statu de la porte
    if requete.decode("utf-8")=="1":
        reponse = str(statue_porte())
        
    #Si c'est deux, il veux ouvrir la porte
    if requete.decode("utf-8")=="2":
        reponse = str(ouverture_porte())
        
    #Si c'est trois il veux fermer la porte
    if requete.decode("utf-8")=="3":
	reponse = str(fermeture_porte())

        reponse = str(fermeture_porte())
   
class TestOuverturePorte(unittest.TestCase):
	def testOuvertureNormal(self):
		porte_ouverte=0
		self.assertEqual(ouverture_porte(), "Porte ouverte")

	def testOuvertureDouble(self):
		porte_ouverte=0
		ouverture_porte()
		self.assertEqual(ouverture_porte(), "Porte deja ouverte")

	def testOuvertureStatusError(self):
		porte_ouverte=3
		self.assertEqual(ouverture_porte(), "Une erreur est survenu")
