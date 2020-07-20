import React, {useState} from 'react';
import Message from './Message';
import FacilityService from '../services/FacilityService';
import DateTimePicker from 'react-datetime-picker';

import '../styles/css/booking.min.css'


const Booking = props => {

  const [message, setMessage] = useState(null);

  const [toDate, setToDate] = useState(new Date());

  const [fromDate, setFromDate] = useState(new Date());

  const [facility, setFacility] = useState("Swimming Pool");

  const toDateOnChange = date => {
    setToDate(date)
  }

  const fromDateOnChange = date => {
    setFromDate(date)
  }

  const facilityOnChange = e => {
    setFacility(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();

    FacilityService.book({
      "facility": facility,
      "start": fromDate,
      "end": toDate
    })
    .then(data => {
      setMessage(data.message);
    })

  }

  return (
    <div className="booking-container">
      <form onSubmit={onSubmit}>
        <label htmlFor="facility">Facility</label>
        <select name="facility" id="facility" onChange={facilityOnChange} value={facility} required>
          <option value="Swimming Pool">Swimming Pool</option>
          <option value="Tennis Court">Tennis Court</option>
          <option value="Gym">Gym</option>
          <option value="Club House">Club House</option>
        </select>
        <label>
          From:
          <DateTimePicker className="date-time-picker" onChange={fromDateOnChange} value={fromDate}/>
        </label>
        <label>
          To:
          <DateTimePicker className="date-time-picker" onChange={toDateOnChange} value={toDate} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message ? <Message message={message}/> : null}
    </div>
  )
}

export default Booking;