const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User')

router.post('/', async(req,res) => {

  if(!req.body.username || !req.body.password)
    return res.status(400).json({message: {msgBody: "Incomplete login information provided", error:true}})
  
  let user = await User.findOne({username: req.body.username.toLowerCase()});

  if(!user)
    return res.status(404).json({message:{msgBody: "User doesn't exist", error:true}});

  if(req.body.password != user.password)
    return res.status(401).json({message:{msgBody: "Wrong password", error: true}});
  
  const token = jwt.sign(
    {username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "12h"}
  );

  res.cookie('access_token', token, {httpOnly: true});

  res.status(200).json({isAuthenticated: true, username: user.username, message:{msgBody: `User ${user.username} successfully logged in`, error: false}})

})

module.exports = router;