import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleWare from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authMiddleWare.authUser,
  body("name").isString().withMessage("Name is required"),
  projectController.createProject
);

router.get("/all", authMiddleWare.authUser, projectController.getAllProjects);

router.put(
  "/add-user",
  authMiddleWare.authUser,
  body('projectId')
    .isString()
    .withMessage("Project ID must be a valid Mongoose ID"),
  body('users')
    .isArray({ min: 1 })
    .withMessage("Users must be an array")
    .bail()
    .custom((users) => users.every(user => typeof user === 'string'))
    .withMessage("Each user must be a string")
    .bail(),
  projectController.addUserToProject
);

export default router;
