import { USERS_BBDD } from "../../bd.js";
import userModel from "../../schemas/user-schema.js";

class UsersController {
  /**
   * Return the user info found by guid
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} userInfo | Not found
   */
  static async get(req, res) {
    const { guid } = req.params;

    const userFound = await userModel.findById(guid).exec();
    // const userFound = USERS_BBDD.find((user) => user.guid === guid);

    if (!userFound)
      return res.status(404).json({
        message: "Not Found",
      });

    res.status(200).json(userFound);
  }

  /**
   * Save a new user, if exists, return 404
   * @param {import("express").Request} req express request object
   * @param {import("express").Response} res express response object
   * @returns {object} success message | Not found
   */
  static async save(req, res) {
    const { guid, name } = req.body;

    if (!guid || !name) return res.status(400).send();

    const userFound = await userModel.findById(guid).exec();

    if (userFound)
      return res.status(409).json({
        OK: false,
        message: "The account already exists.",
      });

    const newUser = new userModel({
      _id: guid,
      name,
    });

    await newUser.save();

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
  static async update(req, res) {
    const { guid } = req.params;

    const { name } = req.body;

    if (!name)
      return res.status(402).json({
        message: "Name is required",
      });

    const userFound = await userModel.findById(guid).exec();

    if (!userFound)
      return res.status(404).json({
        message: "Not Found",
      });

    userFound.name = name;

    await userFound.save();

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
  static async remove(req, res) {
    const { guid } = req.params;
    const userToDelete = await userModel.findOneAndDelete(guid);

    if (!userToDelete)
      return res.status(404).json({
        message: "Not Found",
      });

    res.status(200).json({
      OK: true,
      message: "The user has delete successfully.",
    });
  }
}

export default UsersController;
