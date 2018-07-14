import axios from 'axios';

const url = (process.env.NODE_ENV=="development")?'http://localhost:8080':process.env.HOST;
console.log(process.env.HOST);
async function login(email, token) {
  const result = await axios.get(`${url}/login/${email}`, {params: {token}});

  if (result.status !== 200)
    throw new Error(`Login failed with status: ${result.status}`);

  return result.data;
}

export {
  url,
  login
};