// import globals from '../../../../bin/globals.json';
// import logo from '../assets/img/logo.png';
// import * as nodemailer from 'nodemailer';

const globals = require('../../../../bin/globals.json')
// const logo = require('../assets/img/logo.png');
const nodemailer = require('nodemailer');

function sendEmail(to, subject, content) {
    const transporter= nodemailer.createTransport({
        host: globals.nodemailer.host,
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: globals.nodemailer.username,
            pass: globals.nodemailer.password
        }
    });

    let html = `<div><p>${content}</p></div><br/><br/>`

    const mailOptions = {
        from: globals.nodemailer.username, // sender address
        to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          return 'Error'
        else
          return 'Success'
     });
}