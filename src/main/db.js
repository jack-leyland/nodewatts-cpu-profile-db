const mongoose = require("mongoose");

// Need to add dynamic config for db connection rather than default everytime
const conn = mongoose.createConnection('mongodb://localhost:27017/profiles')

mongoose.connection.on('error', err => {
    console.log("DB CONNECTION ERROR: \n" + err);
})

mongoose.connection.on('open', err => {
    console.log("Profile DB connection successful");
})


// How to handle runtime errors with this connection object?
// const Callframe = conn.model('Callframe', require("../../models/Callframe"));
// const Node = conn.model('Node', require("../../models/Node"));
const Profile = conn.model('Profile', require("../../models/Profile"));

module.exports = {
    conn, Profile
};