const mongoose = require("mongoose")

const NodeSchema = new mongoose.Schema({
    profilerId: Number,
    hitCount: Number,
    callFrame: String,
    children: [Number]
})

module.exports = {
    NodeSchema
}