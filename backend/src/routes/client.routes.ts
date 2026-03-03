import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import ClientController from "../controllers/ClientController";
import ProjectRoutes from "./project.routes";
import { validate } from "../middleware/validate.middleware";
import {createClientSchema,deleteClientSchema,getClientSchema,updateClientSchema} from "../schemas/client.schema";

const router = Router();

router.get("/", authMiddleware, ClientController.list);
router.get("/:clientId", authMiddleware,validate(getClientSchema), ClientController.getClientById);

router.post("/",authMiddleware, validate(createClientSchema), ClientController.create);

router.put("/:clientId",authMiddleware, validate(updateClientSchema), ClientController.update);

router.delete("/:clientId",authMiddleware,validate(deleteClientSchema), ClientController.deleteClient);

router.use("/:clientId/projects", authMiddleware,validate(getClientSchema), ProjectRoutes);

export default router