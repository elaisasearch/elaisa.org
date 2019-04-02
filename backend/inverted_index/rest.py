from pprint import pprint as pp
try:
    reduce
except:
    from functools import reduce
from collections import Counter

def termsearch(terms):  # Searches full inverted index
    if not set(terms).issubset(words):
        return set()
    return reduce(set.intersection,
                  (set(x[0] for x in txtindx)
                   for term, txtindx in finvindex.items()
                   if term in terms),
                  set(texts.keys()))


# def phrasesearch(phrase):
#     wordsinphrase = phrase.strip().strip('"').split()
#     if not set(wordsinphrase).issubset(words):
#         return set()
#     # firstword, *otherwords = wordsinphrase # Only Python 3
#     firstword, otherwords = wordsinphrase[0], wordsinphrase[1:]
#     found = []
#     for txt in termsearch(wordsinphrase):
#         # Possible text files
#         for firstindx in (indx for t, indx in finvindex[firstword]
#                           if t == txt):
#             # Over all positions of the first word of the phrase in this txt
#             if all((txt, firstindx+1 + otherindx) in finvindex[otherword]
#                     for otherindx, otherword in enumerate(otherwords)):
#                 found.append(txt)
#     return found



#storeIndexInMongo(finvindex)

#print('\nTerm Search on full inverted index for: ' + repr(terms))
#pp(sorted(termsearch(terms)))

#phrase = '"beim dritten Mal"'
#print('\nPhrase Search for: ' + phrase)
#print(phrasesearch(phrase))

# Show multiple match capability
#phrase = '"Die Polizei"'
#print('\nPhrase Search for: ' + phrase)
#ans = phrasesearch(phrase)
#print(ans)
#ans = Counter(ans)
#try:
    #print('  The phrase is found most commonly in text: ' +
#repr(ans.most_common(1)[0][0]))
#except:
    #print('  The phrase is found most commonly in text: ' +
         # repr(ans.most_common(1)))