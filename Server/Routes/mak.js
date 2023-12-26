
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const User = require("../models/registration");
const jwt = require('jsonwebtoken')
const Order = require("../models/order");
const MarketTra = require("../models/marketTra")
const cors = require("cors");


router.post("/market", async (req, res) => {
  
    // console.log(req.body);
  
    try {
      const { walletAddress, pincode, maxunit, Price ,users ,userid } = req.body;
  
      
  
      const order = await new Order({
        walletaddre: walletAddress,
        pincode: pincode,
        maxunit: maxunit,
        price: Price,
        user:users,
        userid:userid 
      });
  
      const User = await order.save();
  
      res.status(201).json({ message: "order is placed" });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  
  router.get("/marketord", async (req, res) => {
    try {
      const allOrders = await Order.find();
  
      if (allOrders.length === 0) {
        return res.status(404).json({ message: "no order placed" });
      }
  
      return res.status(201).json(allOrders);
    } catch (error) {
      res.status(404).json(error);
    }
  });
  
  
  
  //  market transactions
  router.post("/marktra",async(req,res)=>{
       
     try {
  
      const {  buyerWallet,  sellerWallet, price , pincode } = req.body;
  
        const Tra = await new MarketTra({
          buyerWallet: buyerWallet,
          sellerWallet: sellerWallet, // Corrected the case here
          price: price,
          pincode:pincode
        });
  
        const done  = await Tra.save();
  
        if(done){
           res.status(201).json({message:"transaction  saved"})
        }
      
     } catch (error) {
      res.status(404).json({message:"transaction not saved"})
     }
  })
  
  
  
  
  //get all  the market transaction
  router.get("/markettra", async (req, res) => {
    try {
       const allTransactions = await MarketTra.find();
   
       if (allTransactions.length === 0) {
         return res.status(404).json({ message: "no transactions found" });
       }
   
       return res.status(200).json(allTransactions);
    } catch (error) {
       res.status(500).json(error);
    }
   });



   ///status code 

   router.put("/status/:id",async(req,res)=>{

       try {
      
        const order = await  Order.findById(req.params.id)

        if (!order) {
          return res.status(404).json({ message: "order not found" });
      }

      order.status = "SOLD"

      const update = await order.save();

      return res.status(200).json(update);
         
        
       } catch (error) {
          res.status(500).json(error);
       }
   })


   //delete item 

   router.delete("/delete/:id",async(req,res)=>{
 
    //  console.log(req.params.id)
          
    try {

      await Order.findByIdAndDelete(req.params.id)
     
      res.status(200).json("Post has been deleted!")

      
      
    } catch (error) {

      return res.status(500).json({message: "something went wrong"})
      
    }

})


 router.put("/upd/:id", async (req, res) => {
  const id = req.params.id;
  
  try {
    const update = await Order.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!update) {
      console.log("Document not found for update");
      return res.status(404).json({ message: "not found" });
    }
    
    // console.log("Updated document:", update);
    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ message: "server error" });
  }
});


   

   module.exports = router;