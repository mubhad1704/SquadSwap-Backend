import mongoose, { Schema } from "mongoose";
const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 110,
    },
    position: {
        type: String,
        required: true,
        enum: [
            "Forward",
            "Midfielder",
            "Defender",
            "Goalkeeper",
        ],
    },
}, {
    timestamps: true,
});
const Player = mongoose.model("Player", playerSchema);
export default Player;
