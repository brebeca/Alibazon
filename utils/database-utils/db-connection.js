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
        console.log(
            "Connected to MongoDb ! ");
        if(done!==undefined)
            done();
    })
        .catch(err => {
            console.log(
                "Error while connecting to mongoDb !\n",
                err);
            if(done!==undefined)
                done();
        });

}

module.exports = {
    get_db: () => database,
    connect:connect
};