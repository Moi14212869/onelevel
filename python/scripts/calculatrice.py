import tkinter as tk
import math

ans = 0
mode_sombre = False

# --- Fonctions principales ---
def cliquer(touche):
    global ans
    actuel = ecran.get()
    if touche == "ANS":
        touche = str(ans)
    elif touche == "√":
        try:
            resultat = math.sqrt(float(actuel))
            ecran.delete(0, tk.END)
            ecran.insert(0, str(resultat))
            ans = resultat
            return
        except:
            ecran.delete(0, tk.END)
            ecran.insert(0, "Erreur")
            return
    elif touche in ["cos", "sin", "tan"]:
        try:
            resultat = getattr(math, touche)(math.radians(float(actuel)))
            ecran.delete(0, tk.END)
            ecran.insert(0, str(resultat))
            ans = resultat
            return
        except:
            ecran.delete(0, tk.END)
            ecran.insert(0, "Erreur")
            return
    elif touche == "π":
        ecran.insert(tk.END, str(math.pi))
        return
    elif touche == "e":
        ecran.insert(tk.END, str(math.e))
        return
    elif touche in ["log", "ln"]:
        try:
            valeur = float(ecran.get())
            resultat = math.log10(valeur) if touche == "log" else math.log(valeur)
            ecran.delete(0, tk.END)
            ecran.insert(0, str(resultat))
            ans = resultat
            return
        except:
            ecran.delete(0, tk.END)
            ecran.insert(0, "Erreur")
            return
    ecran.delete(0, tk.END)
    ecran.insert(0, actuel + touche)

def effacer():
    ecran.delete(0, tk.END)
def supprimer():
    actuel = ecran.get()
    ecran.delete(0, tk.END)
    ecran.insert(0, actuel[:-1])
def calculer():
    global ans
    try:
        expression = ecran.get()
        resultat = eval(expression)
        ecran.delete(0, tk.END)
        ecran.insert(0, str(resultat))
        ans = resultat
        ajouter_historique(f"{expression} = {resultat}")
    except:
        ecran.delete(0, tk.END)
        ecran.insert(0, "Erreur")

def quitter():
    fenetre.destroy()
def clic_historique(event):
    widget = event.widget
    index = widget.index("@%s,%s" % (event.x, event.y))  # position du clic
    ligne = widget.get(index + " linestart", index + " lineend").strip()
    if "=" in ligne:
        expression = ligne.split("=")[0].strip()
        ecran.delete(0, tk.END)
        ecran.insert(0, expression)

def changer_theme():
    global mode_sombre
    mode_sombre = not mode_sombre

    if mode_sombre:
        fenetre.config(bg="#2e2e2e")
        ecran.config(bg="#1e1e1e", fg="white", insertbackground="white")
        historique.config(bg="#1e1e1e", fg="white")
        historique_label.config(bg="#2e2e2e", fg="white")
        couleur_bouton = "#444444"
        couleur_texte = "white"
    else:
        fenetre.config(bg="SystemButtonFace")
        ecran.config(bg="white", fg="black", insertbackground="black")
        historique.config(bg="SystemButtonFace", fg="black")
        historique_label.config(bg="SystemButtonFace", fg="black")
        couleur_bouton = "SystemButtonFace"
        couleur_texte = "black"

    for widget in fenetre.winfo_children():
        if isinstance(widget, tk.Button):
            texte = widget.cget("text")
            if texte == "=":
                widget.config(bg="#4CAF50", fg="white")
            elif texte == "off":
                widget.config(bg="#f44336", fg="white")
            elif texte == "Theme":
                widget.config(bg="#2196F3", fg="white")
            elif texte == "C":
                widget.config(bg="#f44336", fg="white")
            elif texte == "DEL":
                widget.config(bg="#FF9800", fg="white")
            elif texte == "RESET":
                widget.config(bg="#9C27B0", fg="white")
            else:
                widget.config(bg=couleur_bouton, fg=couleur_texte)

def ajouter_historique(texte):
    historique.insert(tk.END, texte + "\n")
    historique.see(tk.END)
def effacer_historique():
    historique.delete(1.0, tk.END)
# --- Fenêtre principale ---
fenetre = tk.Tk()
fenetre.title("Calculatrice")
fenetre.geometry("625x650")
fenetre.resizable(False, False)

# --- Champ d’affichage ---
ecran = tk.Entry(fenetre, font=("Arial", 20), borderwidth=5, relief="sunken", justify="right")
ecran.grid(row=0, column=0, columnspan=5, ipadx=8, ipady=15, padx=10, pady=10)

# --- Zone d'historique ---
historique_label = tk.Label(fenetre, text="Historique", font=("Arial", 14, "bold"))
historique_label.grid(row=0, column=5, padx=10, sticky="n")
historique = tk.Text(fenetre, width=20, height=25, font=("Arial", 12))
historique.grid(row=1, column=5, rowspan=7, padx=10, pady=10)
historique.bind("<Double-1>", clic_historique)
# --- Boutons ---
boutons = [
    ("cos", 1, 0), ("sin", 1, 1), ("tan", 1, 2), ("off", 1, 4),
    ("(", 2, 0), (")", 2, 1), ("%", 2, 2), ("*10**", 2, 3), ("Theme", 2, 4),
    ("log", 3, 0), ("ln", 3, 1), ("e", 3, 2), ("/", 3, 3), ("**", 3, 4),
    ("7", 4, 0), ("8", 4, 1), ("9", 4, 2), ("*", 4, 3), ("√", 4, 4),
    ("4", 5, 0), ("5", 5, 1), ("6", 5, 2), ("-", 5, 3), ("π", 5, 4),
    ("1", 6, 0), ("2", 6, 1), ("3", 6, 2), ("+", 6, 3), ("DEL", 6, 4),
    ("0", 7, 0), (".", 7, 1), ("ANS", 7, 2), ("=", 7, 3),

]

# --- Création des boutons ---
for (texte, ligne, colonne) in boutons:
    if texte == "=":
        bouton = tk.Button(fenetre, text=texte, width=5, height=2, bg="#4CAF50", fg="white",
                           font=("Arial", 16), command=calculer)
    elif texte == "off":
        bouton = tk.Button(fenetre, text=texte, width=5, height=2, bg="#f44336", fg="white",
                           font=("Arial", 16), command=quitter)
    elif texte == "Theme":
        bouton = tk.Button(fenetre, text=texte, width=5, height=2, bg="#2196F3", fg="white",
                       font=("Arial", 16), command=changer_theme)
    elif texte == "DEL":
        bouton = tk.Button(fenetre, text=texte, width=5, height=2, bg="#FF9800", fg="white",
                       font=("Arial", 16), command=supprimer)
    else:
        bouton = tk.Button(fenetre, text=texte, width=5, height=2, font=("Arial", 16),
                           command=lambda t=texte: cliquer(t))
    bouton.grid(row=ligne, column=colonne, padx=5, pady=5)

# --- Bouton effacer ---
bouton_effacer = tk.Button(fenetre, text="C", width=5, height=2, bg="#f44336", fg="white",
                           font=("Arial", 16), command=effacer)
bouton_effacer.grid(row=7, column=4, columnspan=1, padx=5, pady=10)
bouton_effacer_hist = tk.Button(fenetre, text="RESET", width=5, height=2, bg="#9C27B0", fg="white",
                                font=("Arial", 14), command=effacer_historique)
bouton_effacer_hist.grid(row=1, column=3, padx=5, pady=5)
fenetre.mainloop()