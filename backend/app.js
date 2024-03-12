import express from "express"
import dotenv from "dotenv"
import {dbConnection} from "./database/dbConnection.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import fileUpload from "express-fileupload";
import {errorMiddleware} from "./middlewares/error.js"
import userRouter from "./routers/userRouter.js"
import taskRouter from "./routers/taskRouter.js"



const app = express();
dotenv.config({path: "./config/config.env"})
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST","PUT","DELETE","GET"],
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/temp/",
}))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task", taskRouter);
dbConnection();

app.use(errorMiddleware);

export default app