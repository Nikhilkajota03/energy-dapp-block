
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
const AuctionTran = require("../models/auctionTra") ;
const { Auction, Bid } = require("../models/auction");



router.post("/auctionord", async (req, res) => {
  try {
    const { walletAddress, pincode, minPrice, maxunit, users } = req.body;

    // Create a new Auction document (bid material)
    const auctionOrder = await new Auction({
      walletaddre: walletAddress,
      pincode: pincode,
      maxunit: maxunit,
      minprice: minPrice,
      user:users
    });

    // Save the created auction order
    await auctionOrder.save();

    res.status(201).json({ message: "Auction order is placed", auctionOrder });
  } catch (error) {
    console.error("Error creating auction order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//post the bid

router.post("/bid", async (req, res) => {

  try {

    console.log( {"data coming " : req.body})

    const { bidAmount, orderId, bidderWallet } = req.body;



    // Find the auction order by ID
    const auctionOrder = await Auction.findById(orderId);

    if (!auctionOrder) {
      return res.status(404).json({ error: "Auction order not found" });
    }

    // Check if the auction is still open
    if (auctionOrder.status !== "OPEN") {
      return res.status(400).json({ error: "Auction is not open for bidding" });
    }

    const user = await User.findOne({
      walletaddress: bidderWallet,
    });

      if(!user){
        return res.status(403).json({message:"User does not exist"})
      }
    console.log({"user" : user})


    // Push a new bid into the bids array
    const newBid = new Bid({
      bidder: user._id, // Assuming you use authentication and have a user ID in req.user
      bidderwallet: bidderWallet,
      bidAmount: bidAmount,
    });

    auctionOrder.bids.push(newBid);

    // Save the updated auction order
    await auctionOrder.save();

    res.json({ message: "Bid placed successfully", bid: newBid });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//fetch the order
router.get("/auction", async (req, res) => {
  try {
    const allOrders = await Auction.find();

    if (allOrders.length === 0) {
      return res.status(404).json({ message: "no order placed" });
    }

    return res.status(201).json(allOrders);
  } catch (error) {
    res.status(404).json(error);
  }
});


//auction transaction

router.post("/auctra",async(req,res)=>{
     
  try {

   const {  buyerWallet, sellerWallet, price , pincode } = req.body;

     const Tra = await new AuctionTran({
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
router.get("/aucttra", async (req, res) => {
 try {
    const allTransactions = await AuctionTran.find();

    if (allTransactions.length === 0) {
      return res.status(404).json({ message: "no transactions found" });
    }

    return res.status(201).json(allTransactions);
 } catch (error) {
    res.status(404).json(error);
 }
});


//fetch the particular order

router.get("/bids/:id",async(req,res)=>{

   try {
 
    const bid = await Auction.findById(req.params.id).populate("bids");
     if (!bid) {
      return res.status(404).json({ error: "Order not found" });
    }

    const bids =  bid.bids

     return res.status(200).json(bids)
          
    
   } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
   }
})

router.put("/status/:id",async(req,res)=>{

  try {
 
   const order = await  Auction.findById(req.params.id)

   if (!order) {
     return res.status(404).json({ message: "order not found" });
 }

 order.status = "CLOSED"

 const update = await order.save();

 return res.status(200).json(update);
    
   
  } catch (error) {
     res.status(500).json(error);
  }
})

//delete item 

router.delete("/delete/:id",async(req,res)=>{
 
  
       
 try {

   await  Auction.findByIdAndDelete(req.params.id)
  
   res.status(200).json("Post has been deleted!")

   
   
 } catch (error) {

   return res.status(500).json({message: "something went wrong"})
   
 }

})


router.put("/upd/:id",async(req,res)=>{

  

  const id = req.params.id;
 
  
 try {

    const update = await Auction.findByIdAndUpdate(id, req.body , {new:true} )

     if(!update){
     return res.status(404).json({message:"not found"})
     }

    
     return res.status(200).json({ message: "successfully updated" });
     
 } catch (error) {
  return res.status(500).json({message:"server error"})
 }
})




router.put("/updbid/:id",async(req,res)=>{

  const Auctionid = req.params.id;
  const {id , bidAmount} = req.body;   //bid id
  console.log("hit")
 
 try {

    const bid = await Auction.findOne({_id : Auctionid})  //auction id 
    


     if(!bid){
     return res.status(404).json({message:"Auction not found"})
     }

      
     let index = null ;

     for(let i=0; i< bid.bids.length ; i++){
           
          if(bid.bids[i]._id == id){
              index=i;
          }
     }

     console.log(index)

     if (index !== null) {
      bid.bids[index].bidAmount = bidAmount;
      await bid.save();
      return res.status(200).json({ message: "Successfully updated" });
    } else {
      return res.status(404).json({ message: "Bidder not found in the auction" });
    }

     
 } catch (error) {
  return res.status(500).json({message:"server error"})
 }
})



router.delete("/bidDel/:productid/:id",async(req,res)=>{
    
  const Auctionid = req.params.productid;
  const id = req.params.id;   //bid id

  

   try {

    const bid = await Auction.findOne({_id : Auctionid})  //auction id 
    


     if(!bid){
     return res.status(404).json({message:"Auction not found"})
     }

      
     let index = null ;

     for(let i=0; i< bid.bids.length ; i++){
           
          if(bid.bids[i]._id == id){
              index=i;
          }
     }

    

     if (index !== null) {
      bid.bids.splice(index, 1);
      await bid.save();
      return res.status(200).json({ message: "Successfully deleted" });
    } else {
      return res.status(404).json({ message: "Bidder not found in the auction" });
    }

     
 } catch (error) {
  return res.status(500).json({message:"server error"})
 }


})




module.exports = router