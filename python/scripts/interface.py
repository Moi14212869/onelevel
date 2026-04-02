from tkinter import *
#fonctions éxécuté par le bouton
def valid():
    name = entree.get().strip()
    if name:
        name = name.capitalize()
        resultat.config(text=f"Bonjour {name} !")
    else:
        resultat.config(text="Veuillez entrer un nom.")

# Fenêtre
fenetre = Tk()

# titre
fenetre.title("Interface graphique")

# taille de la fenêtre
fenetre.geometry("400x300")

# taille non modifiable
fenetre.resizable(False, False)

# éléments de la fenêtre
text = Label(fenetre, text="Votre nom", font=("Arial", 24))
text.pack()

entree = Entry(fenetre, font=("Arial", 14))
entree.pack()

bouton = Button(fenetre, text="Valider", command=valid)
bouton.pack()

resultat = Label(fenetre, text="", font=("Arial", 14))
resultat.pack()

#faire tourner la fenêtre
fenetre.mainloop()