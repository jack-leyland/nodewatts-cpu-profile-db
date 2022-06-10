const mongoose = require("mongoose"),
        NodeSchema = require("./Node");

const ProfileSchema = new mongoose.Schema({
    name: String,
    typeId: String,
    uid: String,
    profilerTitle: String,
    profilerStartTime: Number,
    profilerEndTime: Number,
    nodes: [NodeSchema],
    samples: [Number],
    timeDeltas: [Number]
})