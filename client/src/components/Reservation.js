import React, {useState} from 'react';
import Message from './Message';
import FacilityService from '../services/FacilityService';
import DateTimePicker from 'react-datetime-picker';


const Reservation = props => {

  const [message, setMessage] = useState(null);

  const [toDate, setToDate] = useState(new Date());

  const [fromDate, setFromDate] = useState(new Date());

  const [facility, setFacility] = useState("swimmingPool");

  const toDateOnChange = date => {
    setToDate(date)
    console.log(toDate)
  }

  const fromDateOnChange = date => {
    setFromDate(date)
  }

  const facilityOnChange = e => {
    setFacility(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();

    FacilityService.reserve({
      "facility": facility,
      "start": fromDate,
      "end": toDate
    })
    .then(data => {
      setMessage(data.message);
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="facility">Facility</label>
        <select name="facility" id="facility" onChange={facilityOnChange} value={facility} required>
          <option value="Swimming Pool" selected>Swimming Pool</option>
          <option value="Tennis Court">Tennis Court</option>
          <option value="Gym">Gym</option>
          <option value="ClubHouse">Club House</option>
        </select>
        <label>
          From:
          <DateTimePicker onChange={fromDateOnChange} value={fromDate}/>
        </label>
        <label>
          To:
          <DateTimePicker onChange={toDateOnChange} value={toDate} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message ? <Message message={message}/> : null}
    </div>
  )
}

export default Reservation;