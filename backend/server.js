import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './db/db.js'
import Products from './models/products.model.js'
dotenv.config()



const server = express()
server.use(express.json())


server.get("/api/products", async (req,res) => {

     try {
        const product = await Products.find({})
        if(!product){
            console.error("No products found.")
        }
        res.status(200).json(product)
    }
    
    catch(error){
        res.status(404).json({success: false, message: "Error in catching products"})
    }
})

server.delete("/api/products/:id", async (req, res) => {

    const {id} = req.params

    if (!Products.id){
        console.error("This product not exists")
    }
    try {
        await Products.findByIdAndDelete(id)
        res.status(200).json({success: true ,message: "Product deleted"})
    } catch (error) {
        res.status(404).json({success: false, message:"Fail on delete"})
    }
})

server.post("/api/products", async (req,res) => {
    const product = req.body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "please provide all fields"})
    }

    const newProduct = new Products(product)

    try {
        await newProduct.save()
        return res.status(201).json({success: true, data: newProduct})

    } catch (error) {
        console.log({message: error})
        res.status(500).json({success:false, message: "Server error"})
    }
})









server.listen(3030, () => {
    connectionDB()
    console.log(`Server Running at http://localhost:3030`)
})





