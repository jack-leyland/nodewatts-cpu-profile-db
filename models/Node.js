import mongoose from "mongoose";

export const NodeSchema = new mongoose.Schema({
    profilerId: Number,
    hitCount: Number,
    callFrame: String,
    children: [Number]
})