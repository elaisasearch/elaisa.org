"""
Handles all spelling checks for the input text
"""

from textblob import TextBlob, Word


def checkSpelling(text):
    """
    Checks if the text is spelled correctly. If not, it returns the probable right text
        - source: https://textblob.readthedocs.io/en/dev/quickstart.html#spelling-correction
    :text: String
    """
    word = Word(text)
    # returns something like: [('hello', 0.7619047619047619), ('hell', 0.23809523809523808)]
    checkResult = word.spellcheck()
    # most probable texts probability
    probability = checkResult[0][1]

    if probability > 0.90:
        blob = TextBlob(text)
        # return the most probable correct word
        return blob.correct()
    else:
        return text