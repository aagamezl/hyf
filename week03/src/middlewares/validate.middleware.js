import { StatusCodes } from "http-status-codes"
import { SEGMENTS } from "../segments.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // await schema.parseAsync(req.body)
      // await Object.keys(schema).forEach(async (element) => {
      //   await schema[element].parseAsync(req[element])
      // });
      for await (const element of Object.keys(schema)) {
        await schema[element].parseAsync(req[element])
      }

      next()
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error.issues)
    }
  }
}