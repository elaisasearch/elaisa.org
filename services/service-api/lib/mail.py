import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import json

"""
Load the global configurations for database connection and collections.
    - source: https://stackoverflow.com/questions/7165749/open-file-in-a-relative-location-in-python
"""
scriptDir = os.path.dirname(__file__)
relPath = 'globals.json'
with open(os.path.join(scriptDir, relPath)) as f:
    GLOBALS = json.load(f)


def sendEmail(email: str, subject: str, content: str):
    """
    Send an Email to the given address.
    """

    sender_email = GLOBALS['mail']['sender']
    password = GLOBALS['mail']['password']

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = email

    message.attach(MIMEText(content, "html"))

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(GLOBALS['mail']['host'], 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, email, message.as_string()
        )
