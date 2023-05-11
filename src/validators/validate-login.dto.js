import { Type } from "@sinclair/typebox"
import addFormats from "ajv-formats"
import addErrors from "ajv-errors"
import Ajv from "ajv"

const loginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "The email address must be a string.",
        format: "Please enter a valid email address",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "The password must be a string.",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "The object format is not valid.",
    },
  }
)

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ["email"]).addKeyword("kind").addKeyword("modifier")
addErrors(ajv)

const validate = ajv.compile(loginDTOSchema)

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body)
  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }))

  next()
}

export default validateLoginDTO
