import { USERS_BBDD } from "../../bd.js";
import authEmailPassword from "../../helpers/auth-email-password.js";

class AuthController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static public(req, res) {
    res.send("Public endpoint");
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static authentication(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        OK: false,
        message: "Email and password are required.",
      });

    try {
      const user = authEmailPassword(email, password);
      return res.send(`User ${user.name} authenticated`);
    } catch (error) {
      return res.sendStatus(401);
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static authorization(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        OK: false,
        message: "Email and password are required.",
      });

    try {
      const user = authEmailPassword(email, password);
      if (user.role !== "admin") {
        return res.sendStatus(403);
      }
      return res.send(`User admin ${user.name} authorizated`);
    } catch (error) {
      return res.sendStatus(403);
    }
  }
}

export default AuthController;
