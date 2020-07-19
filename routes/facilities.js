const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Reservation = require('../models/Reservation');

router.post('/reserve', async(req,res) => {

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
    return res.status(400).json({message: {msgBody: "Reservation cannot be in the past", error:true}});
  }

  jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {

    if(err)
      return res.status(401).json({message: {msgBody: "Invalid JWT token", error:true}});
    
    let pastReservations = await Reservation.find({facility: req.body.facility});

    let conflictFlag = false;

    // pastReservations.forEach(reservation => {
    //   if((start > Date.parse(reservation.start) && start < Date.parse(reservation.end)) || (end > Date.parse(reservation.start) && end < Date.parse(reservation.end))){
    //     conflictFlag = true;
    //     console.log("conflict")
    //     return res.json({message: {msgBody: `This reservation conflicts with ${reservation.username}'s reservation of ${reservation.facility} from ${Date(reservation.start)} to ${Date(reservation.end)}`, error:true}});
    //   }
    // })

    for(let i=0; i<pastReservations.length; ++i){
      if((start > Date.parse(pastReservations[i].start) && start < Date.parse(pastReservations[i].end)) || (end > Date.parse(pastReservations[i].start) && end < Date.parse(pastReservations[i].end))){
        conflictFlag=true;
        return res.json({message: {msgBody: `This reservation conflicts with ${pastReservations[i].username}'s reservation of ${pastReservations[i].facility} from [${pastReservations[i].start.toString().slice(0,21)}] to [${pastReservations[i].end.toString().slice(0,21)}]`, error:true}});
      }
    }

    //let a = new Date().t
    //neither date can be older than current time
    //end date cannot be before start date
    //conflict resolution



    // if(conflictFlag){
    //   return res.json({message: {msgBody: `This reservation conflicts with ${reservation.username}'s reservation of ${reservation.facility} from ${Date(reservation.start)} to ${Date(reservation.end)}`, error:true}});
    // }
    if(!conflictFlag){
      const newReservation = new Reservation({
        username: user.username,
        facility: req.body.facility,
        start: start,
        end: end
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
    }
  })
})

module.exports = router;