const express = require('express');
const User = require('../models/User');
const router = express.Router();
const user = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Jigu@jigu"

//create User using: POST "api/auth". Doesn't require auth
router.post('/createuser', [body('email', 'Enter a valide email').isEmail(),
                  body('name', 'Enter a valid name').isLength({ min: 3 }), 
                  body('password').isLength({ min: 5 })], 
    async (req,res)=>{
          // if there are error, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check if user with email exists 
    try {
    let user = await User.findOne({email:req.body.email});
    if(user) {
        return res.status(400).json({error: "User with this email already exists."})
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    // create new user 
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
    const data  =  {
        user:{
            id: user.id
        }
    }
    const auth_token = jwt.sign(data, JWT_SECRET)
    res.json({auth_token})
    } catch(error) {
        console.log(error.message)
        res.status(500).send("Internal server error has occured")
    }
})

// Authenticate User - Login
router.post('/login', [body('email', 'Enter a valide email').isEmail(),
                            body('password', 'pasword can\'t be blank').exists()],
    async (req,res)=>{
    
    // if there are error, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error:"Please try to login with correct credential"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credential"})
        }
        const data  =  {
            user:{
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET)
        res.send({auth_token})
    } catch(error) {
        console.log(error.message)
        res.status(500).send("Internal server error has occured")
    }
})

module.exports = router