import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";
import ClientRoutes from "./routes/client.routes";
import { errorHandler } from "./middleware/error.middleware";

 dotenv.config();
const app = express();   
const PORT = process.env.PORT || 2000;

app.set("trust proxy", 1);
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://client-project-dashboard-six.vercel.app",
    credentials: true,
  }))

app.use("/auth",AuthRoutes);
app.use("/users",UserRoutes);
app.use("/clients",ClientRoutes)
app.use(errorHandler);

app.listen(PORT,()=>{
  console.log(`Server running on port:`,PORT)
})