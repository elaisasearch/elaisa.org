import re

def extractDomainName(url: str) -> str:
    """
    Ectract domain for company search. Check if there are one or two matches.
    :url: String
    :return: String
    """
    try:
        fullUrl = re.search(r'.*\://(?:www.)?([^\/]+)', url)[1]
    except TypeError:
        fullUrl = re.search(r'.*\://(?:www.)?([^\/]+)', url)[0]
    try:
        domain = re.search(r'.([^\/]+)(.co|.com)', fullUrl)[0]
    except TypeError:
        domain = re.search(r'.([^\/]+)(.co|.com)', fullUrl)[1]
    
    return domain.replace('the', '').replace('.co', '')