"""
Handles all spelling checks for the input text
"""

from textblob import TextBlob, Word


def checkSpelling(text: str) -> str:
    """
    Checks if the text is spelled correctly. If not, it returns the probable right text
        - source: https://textblob.readthedocs.io/en/dev/quickstart.html#spelling-correction
    :text: String
    """

    # ignore a list of terms in the spell check
    ignoredTerms = ['Iran']

    word = Word(text)
    # returns something like: [('hello', 0.7619047619047619), ('hell', 0.23809523809523808)]
    checkResult: list = word.spellcheck()
    # most probable texts probability
    probability: float = checkResult[0][1]

    # Don't correct named entites like 'Iran'.
    # Set value to 1.0 so that it won't hit
    if probability > 0.9 and text not in ignoredTerms:
        blob = TextBlob(text)
        # return the most probable correct word
        return blob.correct()
    else:
        return text