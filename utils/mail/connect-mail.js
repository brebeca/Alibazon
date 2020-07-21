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
    // (err) => { // The callback is not beeing called for this request
    // 	if (err) console.log(`Could not connect to the mailing service!, ${err}`);
    // 	else console.log(log.date_now() + f_header, color.green, `Connected as ${config.email.user} ! `);
    // },
);

module.exports = {
    get_transporter: () => transporter
};