/**
 * Database Connection module.
 * @module database-utils/db-connection
  */
const connectionString=require('../../config').db.connectoinString;
const mongo_client = require(`mongodb`).MongoClient,
    mongo_db     = mongo_client.connect(connectionString,
        {
            useUnifiedTopology: true
        });

let database;

async function connect( done){

    mongo_db.then(db => {
        database = db;
        if(done!==undefined)
            done();
    })
        .catch(err => {
            if(done!==undefined)
                done();
        });

}

module.exports = {
    /**
     * Gets the connection to the database
     * @function get_db
     * @returns {*} the connection to the database
     */
    get_db: () => database,

    /**
     * Makes a connection to the database
     * @async
     * @function connect
     */
    connect:connect
};