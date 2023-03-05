const express = require("express");
require('dotenv').config()
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")(
    "sk_test_51LNHs0SANmJiH2y8xpdi9DFrcg52Rjhql5iKDxhEXgisvckhVMGmBX2ZFrdtMzqZbbCtGpkcFIP5dH73ecuzLs9600AEA2U0uj"
  );
const Products = require("./Products");
const Seller=require("./Seller");
const Users = require("./Users");
const Orders = require("./Orders");
const bcrypt = require("bcryptjs");
const app=express()
const port=8000
app.use(express.json());
app.use(cors());
const connection_url="mongodb+srv://admim:admin1234@blipkart.t2pipfa.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
app.get('/',(reg,res)=>res.status(200).send("Home Page"));
app.post("/products/add", (req, res) => {
    const productDetail = req.body;
    
  console.log("Product Detail >>>>", productDetail);
  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
});
});

app.get("/products/get", (req, res) => {
    Products.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });
  
  // API for SIGNUP
  
  app.post("/auth/signup", async (req, res) => {
    const { email, password, fullName } = req.body;
  
    const encrypt_password = await bcrypt.hash(password, 10);
  
    const userDetail = {
      email: email,
      password: encrypt_password,
      fullName: fullName,
    };
  
    const user_exist = await Users.findOne({ email: email });
  
    if (user_exist) {
      res.send({ message: "The Email is already in use !" });
    } else {
      Users.create(userDetail, (err, result) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.send({ message: "User Created Succesfully" });
        }
      });
    }
  });

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
  
    const userDetail = await Users.findOne({ email: email });
  
    if (userDetail) {
      if (await bcrypt.compare(password, userDetail.password)) {
        res.send(userDetail);
      } else {
        res.send({ error: "invaild Password" });
      }
    } else {
      res.send({ error: "user is not exist" });
    }
  });
  
  // API for PAYMENT
  
  app.post("/payment/create", async (req, res) => {
    const total = req.body.amount;
    console.log("Payment Request recieved for this ruppess", total);
  
    const payment = await stripe.paymentIntents.create({
      amount: total *100,
      currency: "inr",
    });
  
    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  });
  
  // API TO add ORDER DETAILS
  
  app.post("/orders/add", (req, res) => {
    const products = req.body.basket;
    const price = req.body.price;
    const email = req.body.email;
    const address = req.body.address;
  
    const orderDetail = {
      products: products,
      price: price,
      address: address,
      email: email,
    };
  
    Orders.create(orderDetail, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("order added to database >> ", result);
      }
    });
  });

  app.post("/orders/get", (req, res) => {
    const email = req.body.email;
  
    Orders.find((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const userOrders = result.filter((order) => order.email === email);
        res.send(userOrders);
      }
    });
  });
  //seller
  app.post("/seller/add", (req, res) => {
    const products = req.body.basket;
    const price = req.body.price;
    const email = req.body.email;
    const address = req.body.address;
  
    const sellerDetail = {
      products: products,
      price: price,
      address: address,
      email: email,
    };
  
    Seller.create(sellerDetail, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Seller order added to database >> ", result);
      }
    });
  });
  app.post("/seller/get", (req, res) => {
    
  
    Seller.find((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result);
      }
    });
  });


app.listen(port,()=>console.log("listening on port",port));