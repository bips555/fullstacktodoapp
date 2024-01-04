import express from 'express'
import{ apiRoute, apiProtected } from "./routes/api.js"
import mongoose from 'mongoose';
import { MongoDB } from './utilities/constants.js';
import Authmiddleware from './middlewares/Auth.middleware.js';
import cors from "cors"
const PORT = 8000;
const app = express();
mongoose.connect(MongoDB.MongoDBURL,
    {
        dbName:MongoDB.MongoDB_NAME,
        autoCreate:true,
        autoIndex:true
    }).then((success)=>
    {
        console.log("Db server connected");
    }).catch((exception)=>
    {
        console.log("Error establishing db connection");
        process.exit(1)
    })
 app.use(cors())   
app.use(express.json())
app.use("/api/",apiRoute)
app.use("/api/",Authmiddleware,apiProtected)
app.listen(PORT,()=>
{
    console.log("server is running")
})