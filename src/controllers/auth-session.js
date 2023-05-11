import { nanoid } from "nanoid";

import authEmailPassword from "../../helpers/auth-email-password.js";
import validateSessionID from "../../helpers/authenticateUser.js";
import { USERS_BBDD } from "../../bd.js";

export const sessions = [];

class AuthSessionController {
  /**
   * Login user retreiving a auth token
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} token message
   */
  login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
      const { guid } = authEmailPassword(email, password);

      const sessionID = nanoid();
      sessions.push({ sessionID, guid });
      res.cookie("sessionid", sessionID, {
        httpOnly: true,
      });
      return res.status(200).json({});
    } catch (error) {
      return res.sendStatus(401);
    }
  }

  /**
   * Login user retreiving a auth token
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} token message
   */
  getProfile(req, res) {
    const { sessionid } = req.cookies;

    const session = validateSessionID(sessionid);
    if (!session) return res.sendStatus(401);

    const userFound = USERS_BBDD.find((user) => user.guid === session.guid);

    delete userFound.password;
    return res.status(200).json(userFound);
  }
}

export default new AuthSessionController();
