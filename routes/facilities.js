const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');

router.post('/book', async(req,res) => {

  const token = req.cookies.access_token;

  if(!token)
    return res.status(401).json({message: {msgBody: "Missing JWT token", error:true}});
  
  if(!req.body.facility || !req.body.start || !req.body.end){
    return res.status(400).json({message: {msgBody: "Incomplete info provided", error:true}});
  }

  //5000ms is subtracted so requests with start=current time dont get rejected i.e. 5s is given for request to process
  const currentTime = (new Date().getTime()-5000);
  
  const start = Date.parse(req.body.start);
  const end = Date.parse(req.body.end);

  if(end <= start){
    return res.status(400).json({message: {msgBody: "To-date cannot be before/same as From-date", error:true}});
  }

  if(start < currentTime || end < currentTime){
    return res.status(400).json({message: {msgBody: "Booking cannot be in the past", error:true}});
  }

  jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {

    if(err)
      return res.status(401).json({message: {msgBody: "Invalid JWT token", error:true}});
    
    let pastBookings = await Booking.find({facility: req.body.facility});

    let conflictFlag = false;

    // pastBookings.forEach(reservation => {
    //   if((start > Date.parse(reservation.start) && start < Date.parse(reservation.end)) || (end > Date.parse(reservation.start) && end < Date.parse(reservation.end))){
    //     conflictFlag = true;
    //     console.log("conflict")
    //     return res.json({message: {msgBody: `This reservation conflicts with ${reservation.username}'s reservation of ${reservation.facility} from ${Date(reservation.start)} to ${Date(reservation.end)}`, error:true}});
    //   }
    // })

    //using for-loop instead of forEach method because forEach cannot be stopped mid-way (return and break cause problems)

    for(let i=0; i<pastBookings.length; ++i){
      if((start > Date.parse(pastBookings[i].start) && start < Date.parse(pastBookings[i].end)) || (end > Date.parse(pastBookings[i].start) && end < Date.parse(pastBookings[i].end))){
        conflictFlag=true;
        return res.json({message: {msgBody: `This booking conflicts with ${pastBookings[i].username}'s booking of ${pastBookings[i].facility} from [${pastBookings[i].start.toString().slice(0,21)}] to [${pastBookings[i].end.toString().slice(0,21)}]`, error:true}});
      }
    }

    // if(conflictFlag){
    //   return res.json({message: {msgBody: `This reservation conflicts with ${reservation.username}'s reservation of ${reservation.facility} from ${Date(reservation.start)} to ${Date(reservation.end)}`, error:true}});
    // }
    if(!conflictFlag){
      const newBooking = new Booking({
        username: user.username,
        facility: req.body.facility,
        start: start,
        end: end
      })

      newBooking.save(err => {
        if(err){
          console.log(err)
          return res.status(500).json({message: {msgBody: "Server error - cannot save booking", error:true}});
        }
        else{
          res.status(201).json({message: {msgBody: "Booking successfully created", error: false}});
        }
      })
    }
  })
})

router.post('/check', (req, res) => {

  const token = req.cookies.access_token;

  if(!token)
    return res.status(401).json({message: {msgBody: "Missing JWT token", error:true}});
  
  if(!req.body.facility){
    return res.status(400).json({message: {msgBody: "Incomplete info provided", error:true}});
  }

  jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
    if(err)
      return res.status(400).json({message:{msgBody: "Invalid JWT token", error:true}});

    let filteredBookings = [];

    let allBookings = await Booking.find({facility: req.body.facility});

    const currentTime = new Date().getTime();

    allBookings.forEach(booking => {
      if(Date.parse(booking.end) >= currentTime){
        filteredBookings.push(booking);
      } 
    })

    res.status(200).json({
      bookings: filteredBookings,
      message: {
        msgBody: "Success",
        error:false
      }
    })
  })
})

module.exports = router;