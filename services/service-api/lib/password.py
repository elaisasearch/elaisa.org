import redis
import bcrypt
from datetime import datetime
from .mail import sendEmail
from .globals import GLOBALS
from .db import client, MongoEncoder, users, search_history



def handlePasswordChange(email: str, oldPass: str, newPass: str) -> str:
    """
    Changes the password for the user in the database (hashed).
    :email: String
    :oldPass: String
    :newPass: String
    :return: String
    """
    col = users

    newPass_hash = bcrypt.hashpw(newPass.encode('utf-8'), bcrypt.gensalt(14))
    try:
        col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
        return True
    except:
        return False


def handleForgotPassword(email: str) -> dict:
    """
    Changes the password for the user in the database (hashed).
    :email: String
    :oldPass: String
    :newPass: String
    :return: Dictionary
    """
    col = users

    newPassword = randomString(8)
    newPass_hash = bcrypt.hashpw(newPassword.encode('utf-8'), bcrypt.gensalt(14))

    html = """\
    <html>
        <body>
            <p>Hello Elaisa user,<br><br>
            Since you forgot your password, we send you another one with this email.
            Please sign in to Elaisa again and change the temorary password in your 'Account'.
            Then store the new password on a save place to look it up if you forget it the next time :) <br><br>
            <b>New Password: {password}</b>
            <br><br>
            <a href="http://elaisa.org/signin">Sign in with your new password</a>
            <br><br>
            Best regards, <br>
            Alex <br><br>
            Elaisa Support Team
            </p>
        </body>
    </html>
    """.format(password=newPassword)

    try:
        updatedAccount = col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
        
        if updatedAccount.matched_count == 0:
            return "Mail not found"

        sendEmail(email, 'Elaisa - Your new password', html)

        return True
    except:
        return False


# TODO: Send password reset token to provide better security.
def sendPasswordToken(email: str):
    """
    Sends the user a passwordToken via mail to change define a new password within 10 minutes
    :email: String
    """

    try:
        # Connect to Redis cache to store passwordToken temporary
        redisServer = redis.Redis(
            host = GLOBALS["redis"]["host"],
            port = GLOBALS["redis"]["port"],
            db = 0
        )

        tokenData: str = "{}{}".format(email, datetime.now())
        hashedTokenData =  bcrypt.hashpw(tokenData.encode('utf-8'), bcrypt.gensalt(14))

        passwordToken: str = "{}/{}".format(
            email,
            hashedTokenData.decode('utf-8')
        )

        # Store the created passwordToken to the redis cache. Make it unique with the user's email address.
        redisServer.set('passwordToken_{}'.format(email), passwordToken)
        # Delete the passwordToken after 10 minutes
        redisServer.expire('passwordToken_{}'.format(email), 600)

        mailContent = """\
        <html>
            <body>
                <p>Hello Elaisa user,<br><br>
                Since you forgot your password, we send you a link to generate a new one.
                The link is only available for 10 minutes!<br><br>
                <a href="https://elaisa.org/resetpw/{passwordToken}">Reset your password</a>
                <br><br>
                <b>You don't want to change your password? Then please ignore this mail!</b>
                <br><br>
                Best regards, <br>
                Elaisa Support Team
                </p>
            </body>
        </html>
        """.format(passwordToken = passwordToken)

        # Send the link with passwordToken to the user
        sendEmail(email, 'Elaisa - Reset your password', mailContent)

        return True
    except:
        return False


def randomString(stringLength: int) -> str:
    """
    Generate a random string with the combination of lowercase and uppercase letters
    :stringLength: Integer
    :return: String
    """

    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(stringLength))