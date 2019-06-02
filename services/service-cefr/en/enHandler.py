# -*- coding: utf-8 -*-
"""
Created on Mon Apr 15 18:39:16 2019
Skript, zur Extraktion der Begriffe für die englische Sprache
@author: Jenny
"""
import re
from pymongo import MongoClient

language_level = ["A1", "A2", "B1", "B2", "C1", "C2"]
#language_level = ["B2"]
# OLD :A1 = []A2 = []B1 = []B2 = []C1 = []C2 = []
complete_list = []


def extraction_from_pdf(level):
    dateiname = "files/Level " + level + " Word List.txt"
    input_text = open(dateiname, "rb")

    text = input_text.read().decode('iso-8859-1')

    #Suche aller Begriffe mit dem Muster: Newline Word Whitespace Slash(ice)
    muster = r"\n\w+\s/"
    matches = re.findall(muster, text)


    # Spezifisches Wort, wieder durch ein Muster filtern
    liste=[]
    muster = r"\w+"

    for i in matches:
        ergebnisliste = re.findall(muster, i)
        liste.append(ergebnisliste[0])
    #print("Liste ", level, ": ", liste)
    return liste


def listen_verarbeitung(complete_list):
    A1_set = set(complete_list[0])
    A2_set = set(complete_list[1])
    B1_set = set(complete_list[2])
    B2_set = set(complete_list[3])
    C1_set = set(complete_list[4])
    C2_set = set(complete_list[5])
    
    C2 = list(C2_set - C1_set - B2_set - B1_set - A2_set - A1_set)
    C1 = list(C1_set - B2_set - B1_set - A2_set - A1_set)
    B2 = list(B2_set - B1_set - A2_set - A1_set)
    B1 = list(B1_set - A2_set - A1_set)
    A2 = list(A2_set - A1_set)
    A1 = list(A1_set)
    
    A1.sort()
    A2.sort()
    B1.sort()
    B2.sort()
    C1.sort()
    C2.sort()
    
    complete_list = (A1, A2, B1, B2, C1, C2)
    return complete_list
    
for level in language_level:
    complete_list.append(extraction_from_pdf(level))

complete_list = listen_verarbeitung(complete_list)


client = MongoClient('localhost', 27017)
db = client['LanguageLevelSearchEngine']
collection = db['vocab_english']

for i in range(0,6):
    for vokabel in complete_list[i]:
        tmpdict = {"word" : str(vokabel.lower()), "languageLevel" : str(language_level[i])}
        collection.insert_one(tmpdict)
