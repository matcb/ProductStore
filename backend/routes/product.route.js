import express from 'express'
import mongoose from 'mongoose'
import Products from '../models/products.model.js'
const router = express.Router()
export default router

router.get("/", async (req,res) => {

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

router.delete("/:id", async (req, res) => {

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

router.post("/", async (req,res) => {
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

router.put("/:id", async (req,res) => {

   const {id} = req.params
   const product = req.body

   try {
           const updatedProduct = await Products.findByIdAndUpdate(id, product, {new:true})
           res.status(201).json({success: true, message: "Product updated"})

   } catch (error) {
       res.status(500).json({success: false, message: "Server error: Product couldn't be updated"})
   }
})