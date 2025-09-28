import express from 'express'
import authRoutes from './routes/auth.routes.js'//Don't forget to use .js //as we are using type module 
import userRoutes from './routes/user.routes.js'//Don't forget to use .js //as we are using type module
import quizRoutes from './routes/quiz.routes.js'//Don't forget to use .js //as we are using type module
import connectMongoDB from './db/connectMongoDB.js'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express()
const PORT = process.env.PORT || 7000

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // to parse form data  
app.use(cookieParser()); //For protectRoute middelware

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.use("/api/auth",authRoutes) //for sending data from postman in x-www-form-urlencoded form 
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

app.listen(PORT,() => { 
    connectMongoDB()  
    console.log(`Server is running on port ${PORT}`);  
})  