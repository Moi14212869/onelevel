from random import choice
mots = [
"maison", "voiture", "ordinateur", "clavier", "souris", "écran", "fenêtre", "porte",
"table", "chaise", "livre", "stylo", "papier", "cahier", "école", "université",
"professeur", "élève", "travail", "bureau", "entreprise", "argent", "banque",
"ville", "village", "route", "chemin", "montagne", "rivière", "forêt", "mer",
"plage", "bateau", "avion", "train", "métro", "bus", "vélo", "moto",
"chien", "chat", "oiseau", "poisson", "cheval", "vache", "mouton", "poule",
"fromage", "pain", "beurre", "lait", "eau", "café", "thé", "sucre",
"pomme", "banane", "orange", "fraise", "raisin", "citron", "tomate", "salade",
"football", "tennis", "basket", "natation", "course", "sport", "jeu", "joueur",
"soleil", "lune", "étoile", "ciel", "nuage", "pluie", "neige", "vent",
"temps", "heure", "minute", "seconde", "jour", "semaine", "mois", "année",
"amour", "amitié", "famille", "père", "mère", "frère", "soeur", "enfant",
"bonheur", "tristesse", "colère", "peur", "rire", "sourire", "voix", "musique"
]
HANGMANPICS = [r'''






========''', r'''





      |
=========''', r'''




      |
      |
=========''', r'''



      |
      |
      |
=========''', r'''


      |
      |
      |
      |
=========''', r'''

      |
      |
      |
      |
      |
=========''', r'''
      +
      |
      |
      |
      |
      |
=========''', r'''
     -+
      |
      |
      |
      |
      |
=========''', r'''
    --+
      |
      |
      |
      |
      |
=========''', r'''
   ---+
      |
      |
      |
      |
      |
=========''', r'''
  +---+
      |
      |
      |
      |
      |
=========''', r'''
  +---+
  |   |
      |
      |
      |
      |
==========''', r'''
  +---+
  |   |
  O   |
      |
      |
      |
==========''', r'''
  +---+
  |   |
  O   |
  |   |
      |
      |
==========''', r'''
  +---+
  |   |
  O   |
 /|   |
      |
      |
==========''', r'''
  +---+
  |   |
  O   |
 /|\  |
      |
      |
==========''', r'''
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
==========''', r'''
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
==========''']
def pendu(vie):
    motm = choice(mots)
    motv = ["*"] * len(motm)
    mv = vie
    d = []
    while True:
        print("Mot : ", "".join(motv))
        print("Nombre de vie : ", vie)
        print("Lettres déjà entrées : ", ",".join(d))
        lettre = input("Entrez une lettre : ")
        if lettre in d:
            print("Cette letre a déjà été entrée")
            continue
        elif lettre in motm:
            for i, c in enumerate(motm):
                if c == lettre:
                    motv[i] = lettre
        else:
            vie -= 1
        if motm == "".join(motv):
            print("Mot : ", motm)
            print("Gagné !")
            break
        elif vie == 0:
            print("Perdu ! Le mot était ", motm)
            break
        else:
            print(HANGMANPICS[mv - vie])
            d.append(lettre)
        print("=" * 20)
x = input("Nombre de vies (entre 1 et 16) : ")
pendu(x)