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
  }
}