import { Request, Response } from "express";
import mongoose from "mongoose";
import Player from "../models/Player.js";

export const addPlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, rating, position } = req.body;

    if (!name || rating === undefined || !position) {
      res.status(400).json({
        message: "Name, rating and position are required",
      });

      return;
    }

    const player = await Player.create({
      name,
      rating,
      position,
    });

    res.status(201).json({
      message: "Player added successfully",
      player,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add player",
    });
  }
};

export const getPlayers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const players = await Player.find().sort({
      createdAt: -1,
    });

    res.status(200).json(players);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch players",
    });
  }
};


// Update Player
export const updatePlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, rating, position } = req.body;

    // Validate MongoDB ID
    if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: "Invalid player ID",
      });

      return;
    }

    if (!name || rating === undefined || !position) {
      res.status(400).json({
        message: "Name, rating and position are required",
      });

      return;
    }

    const player = await Player.findByIdAndUpdate(
      id,
      {
        name,
        rating,
        position,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!player) {
      res.status(404).json({
        message: "Player not found",
      });

      return;
    }

    res.status(200).json({
      message: "Player updated successfully",
      player,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update player",
    });
  }
};

// Delete Player
export const deletePlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: "Invalid player ID",
      });

      return;
    }

    const player = await Player.findByIdAndDelete(id);

    if (!player) {
      res.status(404).json({
        message: "Player not found",
      });

      return;
    }

    res.status(200).json({
      message: "Player deleted successfully",
      player,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete player",
    });
  }
};