const axios = require('axios');

const url = 'http://3.108.252.150:5000/v1/getscore'; // Replace with the API endpoint URL

const get_score= async(url)=>{
    let data = {}
   await axios.get(url)
  .then((response) => {
    console.log(response.data); // The response data from the API
    data = response.data
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
}
console.log(get_score(url))
