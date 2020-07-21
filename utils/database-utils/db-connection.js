
const mongo_client = require(`mongodb`).MongoClient,
    mongo_db     = mongo_client.connect(process.env.CONNECTION_STRING,
        {
            useUnifiedTopology: true
        });

let database;

mongo_db.then(db => {
    database = db;
    console.log(
        "Connected to MongoDb ! ");
})
    .catch(err => {
        console.log(
            "Error while connecting to mongoDb !\n",
            err);
    });

module.exports = {
    get_db: () => database
};