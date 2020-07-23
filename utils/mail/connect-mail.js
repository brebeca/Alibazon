const node_mailer = require("nodemailer"),
    config      = require("./mail-config");

let transporter = node_mailer.createTransport(
    {
        host: "smtp.gmail.com",
        service: "gmail",
        secure: false,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    }
);

module.exports = {
    get_transporter: () => transporter
};