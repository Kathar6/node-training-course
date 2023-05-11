class UserMiddlewares {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  static getUserInfo(req, res, next) {
    const { ip } = req;
    console.log(ip);
    next();
  }
}

export default UserMiddlewares;
