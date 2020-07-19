const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Reservation = require('../models/Reservation');

router.post('/book', async(req,res) => {

  const token = req.cookies.access_token;

  if(!token)
    return res.status(401).json({message: {msgBody: "Missing JWT token", error:true}});
  
  jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {

    if(err)
      return res.status(401).json({message: {msgBody: "Invalid JWT token", error:true}});
    
    const newReservation = new Reservation({
      username: user.username,
      facility: req.body.facility,
      start: req.body.start,
      end: req.body.end
    })

    newReservation.save(err => {
      if(err){
        console.log(err)
        return res.status(500).json({message: {msgBody: "Server error - cannot save reservation", error:true}});
      }
      else{
        res.status(201).json({message: {msgBody: "Reservation successfully created", error: false}});
      }
    })
  })
})

module.exports = router;