import axios from 'axios';

const url = 'http://localhost:3000';

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