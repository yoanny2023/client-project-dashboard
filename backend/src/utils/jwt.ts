import dotenv from "dotenv";
dotenv.config(); 
import jwt,{Secret} from "jsonwebtoken";

const my_secret: Secret = process.env.JWT_ACCESS_SECRET as Secret
const expiresIn = process.env.JWT_EXPIRES_IN as any || "1d";

export default class JWT{
  
  static sign(payload:object):string{
    return jwt.sign(payload,my_secret,{expiresIn})
  }

  static verify(token: string) {
    return jwt.verify(token, my_secret);
  }
}