const nodemailer = require('nodemailer');
const {smtp, mailer} = require('config');
const transporter = nodemailer.createTransport(smtp);

const createConfirmEmailMessage = (to, name, token) => {
    const html = `Hi ${name}, to verify your account click on <a target="_blank" href="${mailer.domain}/session/confirm-email?token=${token}">link<a/>`;

    return {
        from: `Zafeplace ${mailer.email}`,
        to: to,
        subject: `Confirm email address`,
        html
    }
};

module.exports.sendConfirmEmail = (user, token) => {
    return new Promise((resolve, reject) => {
        const options = createConfirmEmailMessage(user.email, user.firstName, token)
        transporter.sendMail(options, (error, info) => {
            if (error) reject(error);
            resolve(user.email)
        })
    })
};

const createRecoverPasswordMassage = (to, name, token) => {
    const url = `<a target="_blank" href="${mailer.domain}/session/confirm-recover-token?token=${token}">link<a/>`;
    const html = `Hi ${name}. Please go by this ${url} to recover your password, if you don't request password, please ignore this mail.`;
    return {
        from: `Zafeplace ${mailer.email}`,
        to: to, // list of receivers
        subject: 'Recover password', // Subject line
        html: html
    };
};

module.exports.sendRecoverPass = function (user, token) {
    return new Promise((resolve, reject) => {
        const options = createRecoverPasswordMassage(user.email, user.firstname, token);
        transporter.sendMail(options, (error, info) => {
            if (error) reject(error);
            resolve(user)
        })
    });
};