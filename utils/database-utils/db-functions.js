const databaseConn = require("./db-connection"),
    databaseName=require('../../config').db.databaseName;

module.exports = {

    insertAccount: (account) =>
        new Promise((resolve, reject) => {
            let connection = databaseConn.get_db();
            connection.db(databaseName)
                .collection("Accounts")
                .insertOne(account,
                    (err) => {
                        if (err) {
                            reject({err: err});
                        } else {
                            resolve({msg: "Inserted"});
                        }
                    });
         }),

    verifyAccount: (code,email) =>
        new Promise((resolve, reject) => {
            let connection = databaseConn.get_db();
            connection.db(databaseName)
                .collection("Accounts")
                .findOne({code : code, email:email },
                    { $set: { confirmed : true } },
                    (err) => {
                    if ( err ) {
                            reject(err);
                    }
                    else
                        resolve(true);
                });
        }),

    isEmailConfirmed: (email) =>
        new Promise((resolve, reject) => {
            let connection = databaseConn.get_db();
            connection.db(databaseName)
                .collection("Accounts")
                .findOne({ email:email, confirmed: true },
                    (err,document) => {
                        if ( err ) {
                            reject(err);
                        }
                        else
                            if(document!==null)
                                resolve(true);
                            else
                                resolve(false);
                    });
        }),

    confirmeEmail: (email) =>
        new Promise((resolve, reject) => {
            let connection = databaseConn.get_db();
            connection.db(databaseName)
                .collection("Accounts")
                .updateOne({ email:email},
                    { $set: { confirmed: true } },
                    (err,document) => {
                        if ( err ) {
                            reject(err);
                        }
                        else
                        if(document!==null)
                            resolve(true);
                        else
                            resolve(false);
                    });
        }),

    deleteAccount: (code,email) =>
        new Promise((resolve, reject) => {
            let connection = databaseConn.get_db();
            connection.db(databaseName)
                .collection("Accounts")
                .deleteOne({ code:code, email:email },
                    (err) => {
                        if ( err ) {
                            reject(err);
                        }
                        else {
                            resolve(false);
                        }
                    });
        }),


};