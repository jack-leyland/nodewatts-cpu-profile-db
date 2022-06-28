const mongoose = require("mongoose"),
        fs = require("fs"),
        pathUtil = require("../../lib/path-utils"),
        Node = require("../../models/Node").Node,
        Profile = require("../../models/Profile");

//TODO: Dynamic/User given db name in path
async function connectToLocalDB() {
  await mongoose.connect('mongodb://localhost:27017/profiles');
}

//export function to ingest file
async function ingestFile(path, providedName) {
    if (!pathUtil.directoryExists(path)) {
        throw "Invalid or Non-existent Directory"
    }

    if (!pathUtil.validExtension(path)) {
        throw "Invalid File Extension - Only .cpuprofile files may be ingested"
    }

    await connectToLocalDB()
    .then(console.log("DB connection successful"))
    .catch(err => console.log(err));

    mongoose.connection.on('error', err => {
        console.log(err);
    })
    
    /****
    IMPORTANT: 
    This code assumes that the parsed CPU profile JSON will always fit into memory, 
    which may not prove to be the case depending on how long the profiler is run for.
    If this becomes an issue, a better method of streaming and parsing the file will 
    have to be developed to avoid having to save all of the nodes in memory.

    May even need to implement a check on the file size to disallow the user from
    attempting to generate a profile for a test script that runs for a very long time.
    */

    let raw = fs.readFileSync(path);
    let newProfile = JSON.parse(raw);
    
    if (providedName) {
        newProfile.userProvidedName = providedName;
    } else {
        newProfile.userProvidedName = (new Date).getTime().toString();
    }

    newProfile.nodes.forEach((res) => {
        if (res.id) {
            Object.defineProperty(res, "profilerId", Object.getOwnPropertyDescriptor(res,"id"))
            delete res["id"]
        }
    })
    
    const doc = new Profile(newProfile)
    let doc_id;
    return doc.save();
}

module.exports = {
    ingestFile
}