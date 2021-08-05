
var nodemailer = require('nodemailer');
const {Order,ProductCart} =require("../models/order");


exports.getOrderById=(req,res,next,id)=>{

    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
              error : "NO order found in DB"
            });
          }
          req.order=order;
          next();
    });
};

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile;
    const order=new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to save your order in DB"
            });
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'renusinha2jan@gmail.com',
              pass: 'Raaz4789@'
            }
          });
          
          var mailOptions = {
            from: 'renusinha2jan@gmail.com',
            to: req.profile.email,
            subject: 'Confirmation Of Order ',
            text: 'Your Order has Been Accepted ! Keep Shopping more :)'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.json(order);
    });
};

exports.getAllOrders=(req,res)=>{

            Order.find()
                .populate("user","_id name")
                .exec((err,order)=>{
                    if(err){
                        return res.status(400).json({
                          error : "No Orders found in DB"
                        })
                      }
                      res.json(order);
                });
};

exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus=(req,res)=>{
    Order.update(
        { _id: req.body.orderId},
        {$set: {status :req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                  error : "Cannot update Order status"
                });
              }
              res.json(order);
        }
    );
};