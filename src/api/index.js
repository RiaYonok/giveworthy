import axios from 'axios';

const url = ((process.env.NODE_ENV=="development")?'http://localhost:8080':process.env.HOST)+"/api";

async function login(email, token) {

  var params = {
    email:email,
    token:token
  }
  const result = await axios.post(`${url}/login`, {params});
  if (result.status !== 200)
    throw new Error(`Login failed with status: ${result.status}`);
  
  return result.data;
}

export {
  url,
  login
};