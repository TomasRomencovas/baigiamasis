import express from "express";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { userValidationMiddleware } from "../middleware/userValidationMiddleware.js";

const router = express.Router();

// Creating user routes for all CURD actions
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.post("/users", userValidationMiddleware, addNewUser);
router.put("/users/:userId", userValidationMiddleware, updateUser);
router.delete("/users/:userId", deleteUser);

export default router;
