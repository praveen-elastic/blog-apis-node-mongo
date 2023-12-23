import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors";

const app = express();

// load .env environment variables
dotenv.config();

app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json())

const uri = process.env.MONGODB_CONNECTION_STRING;


app.use("/api/user", userRoutes)
app.use("/api/blog", blogRoutes)

const port = process.env.PORT || 5010;

mongoose.connect(uri).then(()=> app.listen(port, () => console.log("Server listening on port"))).catch((err) => console.log(err));


