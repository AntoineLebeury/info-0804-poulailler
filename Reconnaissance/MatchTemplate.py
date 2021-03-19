import numpy as np
import cv2
#Test si l'image est bien ouverte
def test_read(image):
    if image.size == 0:
        print("L'image n'est pas ouverte")
    else:
        print("L'image est bien ouverte")

#Test si la fonction s'est correctement Executée.
def test_match(result):
    if result.size == 0:
        print("La fonction n'a pas bien marché")
    else:
        print("La fonction s'est bien executée")
#importation de l'image de base et l'image a rechercher
image = cv2.imread('poules.jpg')
template = cv2.imread('poule.jpeg')


#Conversion en nuance de gris
imageGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
templateGray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

#Retrouver l'image template dans l'image de base
result = cv2.matchTemplate(imageGray,templateGray, cv2.TM_CCOEFF_NORMED)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
top_left = max_loc
h,w = templateGray.shape
loc=np.where(result >=0.7)
for i in zip(*loc[::-1]):
    cv2.rectangle(image,i, (i[0] + w, i[1] + h),(0,0,255),1)

#Affichage des resultats
cv2.imshow("Template", template)
cv2.imshow("Result", image)

cv2.moveWindow("Template", 10, 50)
cv2.moveWindow("Result", 150, 50)

cv2.waitKey(0)