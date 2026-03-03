import { ZodError} from "zod";

type ZodIssueLike = ZodError["issues"][number];

export function formatZodErros(issues: ZodIssueLike[]){

 const fieldErros: Record<string, string> = {};

      issues.forEach((issue) => {
      const fieldName = issue.path[1]

      if(typeof fieldName === "string"){
           fieldErros[fieldName] = issue.message
      }
      }
    )
 
 return fieldErros;
}