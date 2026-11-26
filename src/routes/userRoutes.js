import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Al montarse en /api/users, "/" corresponde a /api/users y "/:id"
// captura el identificador del usuario enviado en la URL.
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Exportación por defecto para utilizar este router desde index.js.
export default router;
