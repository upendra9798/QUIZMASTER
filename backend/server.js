import express from 'express'
import authRoutes from './routes/auth.routes.js'//Don't forget to use .js //as we are using type module 


const app = express()
const PORT = process.env.PORT || 7000

app.use("/api/auth",authRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})