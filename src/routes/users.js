import { Router } from "express";
import UsersController from "../controllers/users.js";
import UserMiddlewares from "../middlewares/users.js";

const usersRouter = Router();

//#region middlewares
usersRouter.use(UserMiddlewares.getUserInfo);
//#endregion

//#region requests
/**
 * Get all the accounts
 */
usersRouter.get("/:guid", UsersController.get);

/**
 * Save a new Account
 */
usersRouter.post("/", UsersController.save);

/**
 * Update an account
 */
usersRouter.patch("/:guid", UsersController.update);

/**
 * Remove an account
 */
usersRouter.delete("/:guid", UsersController.remove);
//#endregion

export default usersRouter;
