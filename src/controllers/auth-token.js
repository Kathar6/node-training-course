import { USERS_BBDD } from "../../bd.js";
import authEmailPassword from "../../helpers/auth-email-password.js";
import { SignJWT, jwtVerify } from "jose";

class AuthTokenController {
  /**
   * Login user retreiving a auth token
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} token message
   */
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
      const user = authEmailPassword(email, password);
      // Generate and return JWT
      const jwtConstructor = new SignJWT({ guid: user.guid });

      const jwtConfig = jwtConstructor
        .setProtectedHeader({
          alg: "HS256",
          type: "JWT",
        })
        .setSubject(user.guid)
        .setIssuedAt()
        .setExpirationTime("1h");

      // Encode the secret to Uint8Array
      const encoder = new TextEncoder();
      const secretEncode = encoder.encode(process.env.JWT_SECRET);
      const jwt = await jwtConfig.sign(secretEncode);

      return res.json({
        token: jwt,
        message: `User ${user.name} authenticated`,
      });
    } catch (error) {
      return res.sendStatus(401);
    }
  }

  /**
   * get the current user info
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} user info
   */
  async getProfile(req, res) {
    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    try {
      // Encode the secret to Uint8Array
      const encoder = new TextEncoder();
      const secretEncode = encoder.encode(process.env.JWT_SECRET);
      // Verify and get the jwt decrypt
      const jwtData = await jwtVerify(authorization, secretEncode);
      const userFound = USERS_BBDD.find(
        (user) => user.guid === jwtData.payload.sub
      );

      delete userFound.password;
      return res.status(200).json(userFound);
    } catch (error) {
      console.error(error);
      return res.sendStatus(401);
    }
  }
}

export default new AuthTokenController();
