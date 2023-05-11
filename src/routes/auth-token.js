import { Router } from "express"

//#region validators
import validateLoginDTO from "../validators/validate-login.dto.js"
//#endregion

//#region controllers
import AuthTokenController from "../controllers/auth-token.js"
//#endregion

const router = Router()

router.post("/login", validateLoginDTO, AuthTokenController.login)

router.get("/profile", AuthTokenController.getProfile)

export default router
