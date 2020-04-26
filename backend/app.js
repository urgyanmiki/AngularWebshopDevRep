/// Importing express, body-parser and mongodb
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkauth = require("../backend/middleware/check-auth");
const Order = require('./models/order');

const User = require('./models/user');
const Product = require('./models/product');

/// Creating the express application
const app = express();
const cors = require('cors');

//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/// CORS headers

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
  });
  

/// connect to mongoDB

mongoose.connect("mongodb+srv://urgyanmiki:miki98@cluster0-1evye.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true})
.then(()=>{
    console.log('Connected to the Database!');
}).catch(()=>{
    console.log('Connection failed')
});

///----------- Product management

app.post("/api/user",(req,res,next)=> {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.role,
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode
        
    });
   user.save();
    console.log('done!');
    res.status(201.).json({
        message: 'user added succesfully'
    })
});

/// Creating the product

app.post("/api/product/new",(req,res,next)=> {
    
    console.log('It is in the backend');
    const product = new Product({
    id: req.body.id,
    name: req.body.name,
    gender: req.body.gender,
    type: req.body.type,
    imageurl: req.body.imageurl,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    });
    product.save().then(createdProduct => {
    res.status(201).json({
      message: "Post added successfully",
      id: createdProduct.id
    });
});
});

/// get all product

app.get("/api/products", (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      product: documents,    
    });
    
  });

});

/// delete product

app.delete("/api/products/delete:id",(req,res,next) =>{
  Product.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
  })
  res.status(200).json({message: "Post deleted"})
})

/// findone product

/*app.get("/api/products/find:id",(req,res,next)=>{
  Product.find({_id:req.params.id}).then(result=>{
    res.status(200).json({
      message: "Product found",
      product: result,
    })
    console.log(result);
  });
});*/

/// findby category

app.get("/api/products/type:type",(req,res,next)=>{
Product.find({type:req.params.type}).then(documents=>{
  res.status(200).json({
    message:"found",
    product: documents
  })

})
});


///-------------------- User APIs

app.post("/api/user/login",(req,res,next)=> {
  let fetchedUser;
  User.findOne({username: req.body.username}).then(user=>{
    
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password,user.password);
  }).then(result =>{
    if(!result){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      { username: fetchedUser.username, userid: fetchedUser._id},
      "nodem_lokja_trialt-secret_nopass_secretary_encryption98-2.urta_fgdjhhukk_tta",
      {expiresIn: "1h"}  
    );
    res.status(200).json({
      token: token,
      username: fetchedUser.username,
      role: fetchedUser.role,
      id: fetchedUser.id,
      expiresIn: 3600
    });
  }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "Auth failed"
    });
  });
});


app.post("/api/user/signup",(req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const user = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
      password: hash,
      city: req.body.city,
      address: req.body.address,
      zipcode: req.body.zipcode
    });
    user.save().then(result =>{
      res.status(201).json({
        message:"User create successfull",
        result: result,
      });
      
    }).catch(err =>{
      res.status(500).json({
        error: err
        
      });
      console.log(error);
    });
  });
  
}),


/// Orders

app.post("/api/order/new",(req,res,next)=> {
    
  console.log('It is in the backend');
  const order = new Order({
  userid: req.body.userid,
  products: {
    productname: req.body.productname,
    price: req.body.price,
    quantity: '1',    
  },
  paid: req.body.paid
  
  });
  order.save().then(createdOrder => {
  res.status(201).json({
    message: "order added successfully",
    orderid: createdOrder.id
  });
});
});

module.exports = app;

app.put("/api/order/push:orderid",(req,res,next)=>{
  Order.findByIdAndUpdate(
    {_id: req.body.orderid},
    {$addToSet: 
        {products:{
                    productname: req.body.productname,
                    price: req.body.price
                  }
        }
    })
    .then(result=>{
      console.log(result);
    res.status(200).json({
      message:"Update successful!"
    })
  })
});

app.get("/api/order/getall", (req, res, next) => {
  Order.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      product: documents,    
    });
    console.log(documents);
  });

});

app.get("/api/order/:orderid",(req,res,next)=>{
Order.findById({_id: req.params.orderid}).then(documents=>{
  res.status(200).json({
    message: "found",
    order: documents
  })
  console.log(documents);
})
})
/*
app.delete("/api/order/delete/order",(req,res,next) =>{
  Order.deleteOne({_id:"5ea4645f04ceb9027c52d3a2"}).then(result =>{
    console.log(result);
  })
  res.status(200).json({message:"Order Deleted"});

})
*/
  
 app.delete("/api/order/delete:orderid",(req,res,next) =>{
  console.log("asd")
  Order.deleteOne({_id: req.params.orderid}).then(result =>{
    console.log(result);
  })
  res.status(200).json({message: "Post deleted"})
})

