import { USERS_BBDD } from "../bd.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const authEmailPassword = (email, password) => {
  const userFound = USERS_BBDD.find((user) => user.email === email);

  if (!userFound) throw new Error();

  if (userFound.password !== password) throw new Error();

  return userFound;
};

export default authEmailPassword;
