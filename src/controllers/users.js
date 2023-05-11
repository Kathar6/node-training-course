import { USERS_BBDD } from "../../bd.js";

class UsersController {
  /**
   * Return the user info found by guid
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} userInfo | Not found
   */
  static get(req, res) {
    const { guid } = req.params;
    const userFound = USERS_BBDD.find((user) => user.guid === guid);

    if (!userFound)
      return res.status(404).json({
        message: "Not Found",
      });

    res.status(200).json({
      id: guid,
      info: userFound,
    });
  }

  /**
   * Save a new user, if exists, return 404
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} success message | Not found
   */
  static save(req, res) {
    const { guid, name } = req.body;

    if (!guid || !name) return res.status(400).send();

    const userFound = USERS_BBDD.find((user) => user.guid === guid);

    if (userFound)
      return res.status(409).json({
        OK: false,
        message: "The account already exists.",
      });

    USERS_BBDD.push({
      guid,
      name,
    });

    console.log(USERS_BBDD);

    return res.status(201).json({
      OK: true,
      message: "The user has create successfully",
    });
  }

  /**
   * Update the user info found by guid
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} success message | Not found
   */
  static update(req, res) {
    const { guid } = req.params;

    const { name } = req.body;

    if (!name)
      return res.status(402).json({
        message: "Name is required",
      });

    const userFound = USERS_BBDD.find((user) => user.guid === guid)[0];

    if (!userFound)
      return res.status(404).json({
        message: "Not Found",
      });

    userFound.name = name;

    res.status(200).json({
      OK: true,
      message: "The user info has update successfully.",
    });
  }

  /**
   * Delete the user found by guid
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} success message | Not found
   */
  static remove(req, res) {
    const { guid } = req.params;
    const userIndexFound = USERS_BBDD.findIndex(
      (user) => user.guid === guid
    )[0];

    if (userIndexFound === -1)
      return res.status(404).json({
        message: "Not Found",
      });

    USERS_BBDD.splice(userIndexFound, 1);

    res.status(200).json({
      OK: true,
      message: "The user has delete successfully.",
    });
  }
}

export default UsersController;
