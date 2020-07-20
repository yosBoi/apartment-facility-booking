import React, {useState} from 'react';
import Message from './Message';
import FacilityService from '../services/FacilityService';

import '../styles/css/facilities.min.css';


const Facilities = props => {

  const [facility, setFacility] = useState("Swimming Pool");

  const [bookingData, setBookingData] = useState([]);

  const [message, setMessage] = useState(null);

  const facilityOnChange = e => {
    setFacility(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();

    setMessage({msgBody: "Checking...", error:true})

    FacilityService.check({facility})
    .then(data => {
      setBookingData(data.bookings);
      //display msg only if error
      if(data.message.error)
        setMessage(data.message);
      setMessage(null)
    })

  }

  //needed since dates are stored in db as ISO strings which cannot pe properly parsed with Date constructor
  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  const Table = () => {
    if(bookingData.length === 0){
      return (
        <h4>No bookings</h4>
      )
    }
    else{  
      return(
        <table>
          <thead>
          <tr>
            <th>By</th>
            <th>Facility</th>
            <th>From</th>
            <th>To</th>
          </tr>
          </thead>
          <tbody>
          {bookingData.map(booking => {
            return (
            <tr key={booking._id}>
            <td>{booking.username}</td>
            <td>{booking.facility}</td>
            <td>{String(parseISOString(booking.start)).slice(0,21)}</td>
            <td>{String(parseISOString(booking.end)).slice(0,21)}</td>
            </tr>
            )
          })}
          </tbody>
        </table>
      )
    }
  }

  return(
    <div className="facilities-container">
      <form onSubmit={onSubmit}>
        <label htmlFor="facility">Facility: </label>
        <select name="facility" id="facility" onChange={facilityOnChange} value={facility} required>
          <option value="Swimming Pool">Swimming Pool</option>
          <option value="Tennis Court">Tennis Court</option>
          <option value="Gym">Gym</option>
          <option value="ClubHouse">Club House</option>
        </select>
        <button type="submit">Check</button>
      </form>
      <hr/>
      <Table />
      {message ? <Message message={message}/> : null}
    </div>
  )
}

export default Facilities;