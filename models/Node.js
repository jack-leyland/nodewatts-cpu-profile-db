const mongoose = require("mongoose"),
    CallframeSchema = require("./Callframe").CallframeSchema

const NodeSchema = new mongoose.Schema({
    profilerId: {type: Number, required: true},
    hitCount:{ type: Number, required: true},
    callFrame: {type: CallframeSchema, required: true},
    children: {type: [Number], required: false, default: []}
})

const Node = mongoose.model('Node', NodeSchema)

module.exports = NodeSchema;