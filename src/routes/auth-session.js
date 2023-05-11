import { Router } from "express";

//#region controllers
import AuthSessionController from "../controllers/auth-session.js";
//#endregion

const router = Router();

router.post("/login", AuthSessionController.login);

router.get("/profile", AuthSessionController.getProfile);

export default router;
