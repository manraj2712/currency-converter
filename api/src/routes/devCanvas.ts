import { Router } from "express";
import {
  createUser,
  createProject,
  fetchAllProjects,
  getProjectDetails,
  getUserProjects,
  deleteUserProject,
  editUserProject,
  getUser,
} from "../controllers/devCanvas";

const router = Router();

router.post("/user", createUser);
router.post("/project", createProject);
router.get("/projects", fetchAllProjects);
router.get("/project/:id", getProjectDetails);
router.get("/user/:id/projects", getUserProjects);
router.delete("/project/:id", deleteUserProject);
router.put("/project/:id", editUserProject);
router.get("/user/:email", getUser);

export default router;
