import redis
import uuid
import bcrypt
from .mail import sendEmail
from .globals import GLOBALS
from .db import users



def changePasswordHandler(email: str, oldPass: str, newPass: str) -> str:
    """
    Changes the password for the user in the database (hashed). If resetPassword is true, the oldPass
    is ignored.
    :email: String
    :oldPass: String
    :newPass: String
    :return: String
    """
    col = users

    storedUsers = col.find({"email": email})

    for user in storedUsers:
        # Check if the old password is correct
        if bcrypt.checkpw(oldPass.encode('utf-8'), user['password']):

            # Set the new password
            newPass_hash = bcrypt.hashpw(newPass.encode('utf-8'), bcrypt.gensalt(14))
            try:
                col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
                return True
            except:
                return False
        else:
            return "Old password incorrect"


def resetPasswordHandler(passwordToken: str, newPass: str) -> dict:
    """
    Resets the password for the user in the database (hashed).
    :passwordToken: String
    :newPass: String
    :return: String
    """
    col = users
    message = ""

    # Connect to Redis
    redisServer = redis.Redis(
        host = GLOBALS["redis"]["host"],
        port = GLOBALS["redis"]["port"],
        db = 0
    )

    # Get email address from passwordToken. Values are stored as byte strings (decode)
    # key: passwordToken
    # value: user email
    email = redisServer.get(passwordToken).decode('utf-8')

    if email != None:
        # Set the new password
        newPass_hash = bcrypt.hashpw(newPass.encode('utf-8'), bcrypt.gensalt(14))
        try:
            updatedAccount = col.update_one({"email": email}, {"$set": {"password": newPass_hash}})
                
            if updatedAccount.matched_count == 0:
               message = "error: Mail not found"
            else: 
               message = "success"
        except:
            message = "error"
    else:
        message = "error: Token expired"
    
    return {
        "email": email,
        "passwordToken": passwordToken,
        "message": message
    }


def sendResetPasswordToken(email: str):
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

        # Create a random uuid token
        passwordToken: str = str(uuid.uuid4())

        # Store the created passwordToken to the redis cache. It stores the user's  email address as value.
        redisServer.set(passwordToken, email)
        # Delete the passwordToken after 10 minutes
        redisServer.expire(passwordToken, 600)

        mailContent = """\
        <html>
            <body>
                <p>Hello Elaisa user,<br><br>
                Since you forgot your password, we send you a link to generate a new one.<br>
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