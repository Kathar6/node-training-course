import { Router } from "express";
import AuthController from "../controllers/auth.js";

const authRouter = Router();

//#region middlewares
//#endregion

//#region requests
// Public endpoint (optional authentication and authorization)
authRouter.get("/public", AuthController.public);

authRouter.post("/authenticate", AuthController.authentication);

authRouter.post("/authorizate", AuthController.authorization);
//#endregion

export default authRouter;
