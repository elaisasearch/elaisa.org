import pandas as pd
from pymongo import MongoClient
import numpy as np
import json
import os

"""
Load the global configurations for database connection and collections.
    - source: https://stackoverflow.com/questions/7165749/open-file-in-a-relative-location-in-python
"""
scriptDir = os.path.dirname(__file__) 
relPath = '../globals.json'
with open(os.path.join(scriptDir, relPath)) as f: 
    GLOBALS = json.load(f)


# Global connection to database
# source: https://api.mongodb.com/python/current/examples/authentication.html
client = MongoClient(
    GLOBALS["mongo"]["auth"]["host"],
    username= GLOBALS["mongo"]["auth"]["username"],
    password= GLOBALS["mongo"]["auth"]["password"],
    authSource= GLOBALS["mongo"]["auth"]["authSource"],
    authMechanism= GLOBALS["mongo"]["auth"]["authMechanism"]
)

###############################################################################
# TODO
# Eventuell Firmennamen etc. abfangen? als Sonstige oder so?
# Satzlänge einkalkulieren
#
# Example: 
# text = "Dude. Amazon, Apple, Microsoft, Germany, Italy, Mafia, Pizza."
# doc = textacy.Doc(text)
# result = list(textacy.extract.named_entities(doc, exclude_types='numeric'))
###############################################################################
# Eingabe: String
# Ausgabe: Liste [MainLevel, Difficulty] (some sort of language level)
def categorizeText(input_text):
    #TODO, abfangen von leeren Texten 
    if (not(isinstance(input_text, str)) or (len(input_text) <= 0)):
        dicti = {"unknown": "NOT OKAY!", "A1": "THIS!", "A2" : "IS!", "B1": "NOT!", "B2": "A!", "C1": "TEXT!", "C2": "NO!"}
        return ["NO!", "NO!", dicti]
        
    text = input_text.split()
    text = [item.lower() for item in text]

    # Dict-Counter, der Worte
    dict_vocab_count = dict_count(text)

    # Dataframe, set der Worte mit Sprachniveau
    # word, level
    set_word_table = level_dataFrame(set(text))
    

# EINSTUFUNG DES SPRACHNIVEAUS

    # Betrachtung der Verteilung
    verteilung = {}
    tmp_count = 0
    
    #TODO : DEVIDE BY ZERO ?!?!?!
    #für jedes Wort aus dem Text, geordnet nach Level, 
    for lvl in ["unknown", "A1", "A2", "B1", "B2", "C1", "C2"]:
        for word in set_word_table.loc[set_word_table['level']== lvl, "word"]:
            tmp_count += dict_vocab_count[word]
        tmp_result = tmp_count/ len(text) * 100
        verteilung[lvl] = round(tmp_result)
        tmp_count = 0
    
    #Einstufung anhand des höchsten Levels, das mehr als n verschiedene Wörter enthält
    # sehr unschön bisher!
    n = 4
    levels, counts = np.unique(set_word_table['level'], return_counts=True)
    
    if (len(levels) > 0):
        tmp_index, = np.where(levels == "unknown") # löschen der Stellen, an denen die Werte für UNKNOWN Worte stehen, da diese kein Sprachniveau sind
        levels = np.delete(levels, tmp_index)
        counts = np.delete(counts, tmp_index)
    max_level = np.max(levels[counts > n])
    
    # TODO : Satzlänge!
    #Einstufung des Schwierigkeitgrades der unbekannten Worte, Grenze: m
    # wenn Worte, die länger als m sind, werden als schwer eingestuft. dann einfach, wovon es mehr gibt
    count_easy = 0
    count_hard = 0
    m = 6 # siehe Wolfram alpha 5.1
    
    for word in set_word_table.loc[set_word_table['level']== "unknown", "word"]:
        if len(word) > m:
            count_hard += 1
        elif len(word) <= m:
            count_easy += 1   
    
    if count_easy <= count_hard:
        difficulty = "hard"
    else:
        difficulty = "easy"

    # return Liste [mainLevel, Schwierigkeitsgrad, Sprachniveaus_Verteilung]
    return [max_level, difficulty, verteilung]

###############################################################################
# Eingabe: Liste mit Strings
# Ausgabe: dictionary mit word und count
def dict_count(text):
    dici = {}
    for word in text:
        if word in dici:     
            dici[word] += 1
        else:
            dici[word] = 1
            
    return dici

###############################################################################
# Eingabe: set(text)
# Ausgabe: DataFrame mit word und level (A1 - C2, unknown) für das gegebene Set des Textes
def level_dataFrame(text):
        # Set, zum abgleichen in DB
    set_text = set(text)
    set_word_table = pd.DataFrame(columns=['word', 'level'])
    # Serververbindung
    db = client[GLOBALS["mongo"]["database"]]
    collection = db[GLOBALS["mongo"]["collections"]["cefr"][0]]

    # set_Tabelle mit   | Vokabel | Level |
    for w in set_text:
        level = collection.find_one(
            {"word": w}, {"languageLevel": 1, "_id": 0})
        if level:
            level = level['languageLevel']
        else: 
            level = "unknown"
            
        # einfügen Zeilen, WORD LANUAGELEVEL
        set_word_table = set_word_table.append(pd.DataFrame(
            [[w, level]], columns=['word', 'level']))
        
    return set_word_table

###############################################################################

