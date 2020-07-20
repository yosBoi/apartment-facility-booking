export default {
  reserve: reservation => {
    return fetch('/api/facilities/reserve',{
      method: "post",
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json().then(data => data);
    })
  },
  check: facility => {
    return fetch('/api/facilities/check',{
      method: 'post',
      body: JSON.stringify(facility),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json().then(data => data)
    })
  }
}