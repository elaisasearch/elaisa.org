import re
"""
Skript, zur Extraktion der Begriffe für die englische Sprache
"""
language_level = ["A1", "A2", "B1", "B2", "C1", "C2"]
#language_level = ["B2"]

# OLD :A1 = []A2 = []B1 = []B2 = []C1 = []C2 = []

complete_list = []


def extraction(level):
    dateiname = "Level " + level + " Word List.txt"
    input_text = open(dateiname, "r")

    text = input_text.read()

    #Suche aller Begriffe mit dem Muster: Newline Word Whitespace Slash(ice)
    muster = r"\n\w+\s/"
    matches = re.findall(muster, text)


    # Spezifisches Wort, wieder durch ein Muster filtern
    liste=[]
    muster = r"\w+"

    for i in matches:
        ergebnisliste = re.findall(muster, i)
        liste.append(ergebnisliste[0])
    print("Liste ", level, ": ", liste)
    return liste


# Funktionsaufruf, Speichern aller Level-Listen in complete_list
for level in language_level:
    complete_list.append(extraction(level))
    

print(complete_list)


# TODO: Checken, ob die einzelnen Listen disjunkt sind
# TODO: Was machen wir mit doppelten Worten? (-> minimalstes Niveau auswählen!)