import express from 'express'
import authRoutes from './routes/auth.routes.js'//Don't forget to use .js //as we are using type module 
import userRoutes from './routes/user.routes.js'//Don't forget to use .js //as we are using type module
import connectMongoDB from './db/connectMongoDB.js'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express()
const PORT = process.env.PORT || 7000

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // to parse form data  
app.use(cookieParser()); //For protectRoute middelware

app.use("/api/auth",authRoutes) //for sending data from postman in x-www-form-urlencoded form 
app.use("/api/user", userRoutes);


app.listen(PORT,() => { 
    connectMongoDB()  
    console.log(`Server is running on port ${PORT}`);  
})  