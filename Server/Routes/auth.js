const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/registration");
const jwt = require("jsonwebtoken");
const Order = require("../models/order");
const { Auction, Bid } = require("../models/auction");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    // console.log(users.password);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/signup", async (req, res) => {

  const {
    name,
    email,
    Aadhar,
    phone,
    walletAddress,
    maxquantity,
    pincode,
    password,
  } = req.body;


   const check = await User.findOne({walletaddress: walletAddress})

   if(check){
      // console.log(check)
      return res.status(409).json({message:"user already exist"})  

    }


  try {
    

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hashSync(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      Aadhar: Aadhar,
      phone: phone,
      walletaddress: walletAddress,
      maxquantity: maxquantity,
      pincode: pincode,
      password: hashpass,
    });

    

    const save = await newUser.save();
    res.status(200).json(save);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Network eerror" });
  }
});

router.post("/login", async (req, res) => {
  try {
    //   const {email,password}= req.body;

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("user not found");
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("wrong credentials");
    }

    //  res.status(200).json(user);

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.name,
        email: user.email,
        walletAddress: user.walletaddress,
      },
      "jwt-secret-key",
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/logout", (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/refetch", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ error: "jwt must be provided" });
    }

    jwt.verify(token, "jwt-secret-key", {}, async (err, data) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/userupd/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)

  const {
    name,
    email,
    Aadhar,
    phone,
    walletAdd,
    maxquantity,
    pincode,
    userid,
    oldusser,
    password,
  } = req.body;

  // console.log(typeof userid);

  const salt = await bcrypt.genSalt(10);

  if (password !== undefined) {
    hashpass = await bcrypt.hashSync(password, salt);
  }

  try {
    console.log("in try");

    const upd = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        Aadhar,
        phone,
        walletaddress: walletAdd,
        maxquantity,
        pincode,
        ...(password && { password: hashpass }),
      },
      { new: true }
    );

    //  console.log(upd)

    if (!upd) {
      console.log("Document not found for update");
      return res.status(404).json({ message: "not updated or  found" });
    }

    //auction update--------------------------------------------------------------------

   

    const ordersupd = await Auction.find();
    console.log(ordersupd.length)

   

    for (let i = 0; i < ordersupd.length; i++) {
      // let oldname = ordersupd[i].user;

     

    

      if (ordersupd[i].user == oldusser) {
        const updateResult = await Auction.findOneAndUpdate(
          { user: oldusser },
          { $set: { user: name } },
          { new: true }
        );
      }
    }


  //marketplace  update--------------------------------------------------------------------

    const makupd = await Order.find();

   

    for (let i = 0; i < makupd.length; i++) {
     

      if (makupd[i].user == oldusser) {
        const updateResult = await Order.findOneAndUpdate(
          { user: oldusser},
          { $set: { user: name } },
          { new: true }
        );
      }

    }

  //-------------------------------------------------------------------------------------------





    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
});






router.delete("/userDel/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const dltPro = await User.findByIdAndDelete(id);
    if (!dltPro) {
      return res.status(404).json({ message: "no user found" });
    }

    return res.status(200).json({ message: " user deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
