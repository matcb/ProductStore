import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './db/db.js'
import productRoutes from './routes/product.route.js'

dotenv.config()
const server = express()
server.use(express.json())








server.listen(3030, () => {
    connectionDB()
    console.log(`Server Running at http://localhost:3030`)
})





