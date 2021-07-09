// const { Router } = require("express");
const { check, validationResult } = require('express-validator');
var express=require('express');
var router=express.Router();
const {signout,signup,signin,isSignedIn}=require("../controllers/auth")

router.post("/signin",[
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min:3}).withMessage('password must be atleast of 3 char'),
    
],signin);


router.post("/signup",[
    check("name").isLength({ min:3 }).withMessage('must be at least 3 chars long'),
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min:3}).withMessage('password must be atleast of 3 char'),
    
],signup);
router.get("/signout", signout);

router.get("/testroute",isSignedIn,(req,res)=>{
    res.send("A protected route");
})
module.exports= router;  