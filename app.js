import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js'
import adminRouter from './routes/admin.routes.js'
import errMiddleware from './middlewares/error.middleware.js'
import connectDB from './utils/db.js'
import cookieParser from 'cookie-parser'



dotenv.config()
const app = express()
const PORT = process.env.PORT


app.use(cors({
  origin: ['http://localhost:8158', 'http://localhost:5173'],
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use(errMiddleware)


connectDB().then(() => {
	app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
})