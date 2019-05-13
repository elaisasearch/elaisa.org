# -*- coding: utf-8 -*-
"""
Created on Sun May 12 21:13:58 2019

@author: Jenny
"""
#from pymongo import MongoClient
import pandas as pd
import numpy as np
from pymongo import MongoClient

def categorizeText(input_text):
    text = input_text.split()
    
    # Counter, aller Wörter des Textes
    length_text = len(text)     # Gesamtmenge
                                # Anzahl je Wort
    
    # Set, zum abgleichen in DB 
    text = "play CD"
    set_text = set(text)
    
    word_table = pd.DataFrame(columns = ['word', 'level'])
    
    
    #Serververbindung
    client = MongoClient('localhost', 27017)
    db = client['LanguageLevelSearchEngine']
    collection = db['vocab_english']
    
    
    for w in set_text:
        #level = "B3"
        # GET level = LEBEL(i)
        level = collection.find_one({"word": w},{ "languageLevel": 1, "_id": 0 })
        level = level['languageLevel']
        
        #einfügen Zeilen, WORD LANUAGELEVEL
        word_table = word_table.append(pd.DataFrame([[i, level]], columns = ['word', 'level']))
    
    levels, counts = np.unique(word_table['level'], return_counts = True)
    max_level = np.max(levels[counts>4])
    
    result_list = result_list.append(result_list)
    
    
    return [max_level]
    
    
texty = "i play cd"

print(categorizeText(texty))