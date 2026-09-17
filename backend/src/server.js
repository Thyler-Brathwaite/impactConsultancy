import express from 'express'
import cors from "cors";
import router from './routers/router.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv'
import { connectDb } from './config/config.js';
import rateLimiter from './middleware/rateLimiter.js';
import {clerkMiddleware} from '@clerk/express'


dotenv.config();




const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5002;
app.use(clerkMiddleware())
app.use(rateLimiter)

app.use("/api/appointments", router )

app.use("/api/user", userRouter )

connectDb().then(()=>{
    app.listen( PORT,"0.0.0.0", ()=>{
    console.log("server has started on port", PORT)
})
})