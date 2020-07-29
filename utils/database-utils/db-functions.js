/**
 * Database Functions module.
 * @module database-utils/db-functions
 * @see module:database-utils/db-connection
 */
const databaseConn = require("./db-connection"),
    databaseName=require('../../config').db.databaseName;

module.exports = {

    /**
     * Inserts an account into the databse
     * @param account the account to be inserted
     * @returns {Promise<Object>} object with success message
     */
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
                            resolve({message: "Inserted"});
                        }
                    });
         }),

    /**
     * Verify if the account with the code and email in parmas exists
     * @param code the code of the account
     * @param email  the email of the account
     * @returns {Promise<boolean>} true if document exists, false if not
     */
    verifyAccount: (code,email) =>
        new Promise((resolve, reject) => {
            let connection = databaseConn.get_db();
            connection.db(databaseName)
                .collection("Accounts")
                .findOne({code : code, email:email },
                    (err,documnet) => {
                    if ( err ) {
                            reject(err);
                    }
                    else {
                        if (documnet !== null)
                            resolve(true);
                        else
                            resolve(false);
                    }
                });
        }),

    /**
     * Checks if the account with the email in params is confirmed or not in db
     * @param email the email to be checked
     * @returns {Promise<boolean>} true if the email is confirmed, else false
     */
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

    /**
     * Updates the account with the email in params to set 'confirmed' to true
     * @param email the email of the account to be updated
     * @returns {Promise<boolean>} true if the document with the email exists, false else
     */
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

    /**
     * Deletes the document with the code and email in params
     * @param code the code of the account
     * @param email the email of the account
     * @returns {Promise<boolean>} true
     */
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