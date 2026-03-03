import { NextFunction, Request, Response } from "express"
import {ZodObject,ZodError} from "zod"
import { formatZodErros } from "../utils/zodErrorFormatter";

export function validate(schema: ZodObject){
  return function(req: Request, res: Response, next: NextFunction){
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      }) 

      next();
      
    } catch (err) {
      if(err instanceof ZodError){
        return res.status(400).json({
          message: "Validation failed",
          errors: formatZodErros(err.issues),
        });
      }
      next(err);
    }
  }
}