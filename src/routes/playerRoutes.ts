import { Router } from "express";

import {
  addPlayer,
  getPlayers,
  updatePlayer,
  deletePlayer,
} from "../controllers/playerController.js";

const router = Router();

router.post("/", addPlayer);
router.get("/", getPlayers);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
