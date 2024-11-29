import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './db/db.js'
import Product from './models/products.model.js'
dotenv.config()



const server = express()
server.use.json()

server.listen(3030, () => {
    connectionDB()
    console.log(`Server Running at http://localhost:3030`)
})


server.get('/products', (req,res) => {
    res.send('Server Running')
})



