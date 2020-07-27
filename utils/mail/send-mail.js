
const config      = require("./mail-config"),
    fs          = require("fs"),
    path        = require("path"),
    mail        = require("./connect-mail");

module.exports = {
    /**
     * @param {string} email - User's email
     * @param {string}[user] - Username - Username of the user
     * @param {string}[code] - Unique user registration code
     */
    send: (email, user, code) => {
        return new Promise((resolve, reject) => {
            try {
               let transporter = mail.get_transporter();
                fs.readFile(path.join(__dirname,
                    "./mail-layout/index.html"),
                    "utf8",
                    (err, html) => {
                        if ( err ) throw err;
                        else {
                            html = html.replace("{{USER}}", user);
                            html = html.replace("{{CODE}}", code);

                            let mail = {
                                to: email,
                                from: config.email.user,
                                subject: "Confirm Alibazon registration",
                                html: html
                            };
                            transporter.sendMail(mail,
                                function (err, info) {
                                    if ( err ){
                                       console.log( `Could not connect to the mailing service!, ${ err }`);
                                    }
                                   else  resolve(true);
                                });
                        }
                    });
            } catch (e) {
                console.log( e);
                reject(false);
            }
        });
    }
}