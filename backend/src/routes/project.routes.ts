import { Router } from "express";
import ProjectController from "../controllers/ProjectController";
import { validate } from "../middleware/validate.middleware";
import { createProjectSchema, deleteProjectSchema, getProjectSchema, updateProjectSchema } from "../schemas/project.schema";

const router = Router({ mergeParams: true });

router.get("/",ProjectController.listByClient)
router.get("/:id",validate(getProjectSchema),ProjectController.getById)

router.post("/",validate(createProjectSchema),ProjectController.create);

router.put("/:id",validate(updateProjectSchema),ProjectController.update);

router.delete("/:id",validate(deleteProjectSchema),ProjectController.delete);

export default router