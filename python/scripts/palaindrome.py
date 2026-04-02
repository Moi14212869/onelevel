def pal():
    chaine = input("Entrez un mot a tester : ")
    chaine = chaine.lower()
    inv = ''.join(reversed(chaine))
    if inv == chaine:
        print(chaine.capitalize(), " est un palindrome")
    else:
        print(chaine.capitalize(), " n'est pas un palindrome")

pal()