export default {
  book: booking => {
    return fetch('/api/facilities/book',{
      method: "post",
      body: JSON.stringify(booking),
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