const mongoose = require("mongoose"),
        fs = require("fs"),
        pathUtil = require("../../lib/path-utils")
        Node = require("../../models/Node")
        Profile = require("../../models/Profile")

//TODO: Dynamic/User given db name in path
async function connectToLocalDB() {
  await mongoose.connect('mongodb://localhost:27017/profiles');
}

//export function to ingest file
function ingestFile(path) {
    if (!pathUtil.directoryExists(path)) {
        throw "Invalid or Non-existent Directory"
    }

    if (!pathUtil.validExtension(path)) {
        throw "Invalid File Extension - Only .cpuprofile files may be ingested"
    }

    connectToLocalDB()
    .then(console.log("DB connection successful"))
    .catch(err => console.log(err));

    mongoose.connection.on('error', err => {
        console.log(err);
    })

    //parse the file from stream
    //How to deal with nested nodes? Do they have to be in their own collection?

}

//import parser
module.exports = {
    ingestFile
}