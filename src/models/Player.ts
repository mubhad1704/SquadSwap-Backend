import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  rating: number;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}

const playerSchema = new Schema<IPlayer>(
  {
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
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model<IPlayer>(
  "Player",
  playerSchema
);

export default Player;