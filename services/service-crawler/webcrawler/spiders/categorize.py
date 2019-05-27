import pandas as pd
from pymongo import MongoClient
import numpy as np

###############################################################################
# Eingabe: String
# Ausgabe: Liste [MainLevel, Difficulty] (some sort of language level)
def categorizeText(input_text):
    #TODO, abfangen von leeren Texten 
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
    
    for i in verteilung:
        print(i , verteilung[i])
    
    #Einstufung anhand des höchsten Levels, das mehr als n verschiedene Wörter enthält
    n = 4
    levels, counts = np.unique(set_word_table['level'], return_counts=True)
    levels.drop(['unknown'], axis=1)
    max_level = np.max(levels[counts > n])
    
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
# Ausgabe: DataFrame mit word und level (A1 - C2, unknown)
def level_dataFrame(text):
        # Set, zum abgleichen in DB
    set_text = set(text)
    set_word_table = pd.DataFrame(columns=['word', 'level'])
    # Serververbindung
    client = MongoClient('localhost', 27017)
    db = client['LanguageLevelSearchEngine']
    collection = db['vocab_english']
    
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

