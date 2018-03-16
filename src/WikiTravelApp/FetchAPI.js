const FetchAPI = ( {base, key} ) => {
  console.log(base + key)
  fetch(base + key).then(response => {
    response.json().then(json => {
      console.log(json)
    }).catch(error => console.log(error))
  }).catch(error => console.log(error))
}

export default FetchAPI