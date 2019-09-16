import globals from './globals.json';
import logo from '../assets/img/logo.png';
import * as nodemailer from 'nodemailer';

export default function sendEmail(to, subject, content) {
    const transporter = nodemailer.createTransport({
        host: globals.nodemailer.host,
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: globals.nodemailer.username,
            pass: globals.nodemailer.password
        }
    });

    let html = `${content}<br/><br/><img src=${logo} width='30%'></img>`

    const mailOptions = {
        from: globals.nodemailer.username,
        to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('no mail sent')
            return 'Error'
        }
        else {
            console.log("mail sent")
            return 'Success'
        }

    });
}