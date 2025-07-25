import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import db from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import welcomeRoutes from './routes/welcome.route.js'
import blogRoutes from './routes/blog.routes.js'
import cookieParser from 'cookie-parser'
db()
let app=express()

app.set("view engine","ejs")
app.set("views", "./src/views")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))



app.use("/welcome",welcomeRoutes)
app.use("/auth",authRoutes)
app.use("/blogs",blogRoutes)


export default app;