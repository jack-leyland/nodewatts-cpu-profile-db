const mongoose = require("mongoose");


// These variables will be available in the nodewatts subprocess shell environment from which the function will be run
// If the cli version of this package is being used for dev purposes it will use the below defaults.
var port = 27017
var dbName = "nodewatts"
if (!process.env.NODEWATTS_DB_PORT) {
    port = process.env.NODEWATTS_DB_PORT
}
if (!process.env.NODEWATTS_DB_NAME) {
    dbName = process.env.NODEWATTS_DB_NAME
}

const conn = mongoose.createConnection('mongodb://localhost:' + port + '/'+ dbName)

mongoose.connection.on('error', err => {
    console.error("DB CONNECTION ERROR: \n" + err);
})

mongoose.connection.on('open', err => {
    console.log("Profile DB connection successful");
})

// How to handle runtime errors with this connection object?
const Callframe = conn.model('Callframe', require("../../models/Callframe"));
const Node = conn.model('Node', require("../../models/Node"));
const Profile = conn.model('Profile', require("../../models/Profile"));

module.exports = {
    conn, Node, Profile, Callframe
};