import { Router } from "express";

//#region controllers
import AuthTokenController from "../controllers/auth-token.js";
//#endregion

const router = Router();

router.post("/login", AuthTokenController.login);

router.get("/profile", AuthTokenController.getProfile);

export default router;
