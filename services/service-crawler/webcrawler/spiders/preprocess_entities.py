# -*- coding: utf-8 -*-
"""
Created on Mon Jun 17 10:55:47 2019

@author: Jenny
"""
import textacy

def process_entities(text):
    
    doc = textacy.Doc(text)

    result = list(textacy.extract.named_entities(doc, exclude_types='numeric'))

    print(result)
    
    
    processed_text = []
    return processed_text