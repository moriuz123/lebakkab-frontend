import axios from 'axios';

axios.get('http://localhost:8000/api/pejabat')
  .then(res => console.log(JSON.stringify(res.data, null, 2)))
  .catch(err => console.error('Error fetching', err.message));
