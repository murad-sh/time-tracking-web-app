import axios from 'axios';

const USERS_API = '/api/auth/sign-up';
const TAGS_API = '/api/tags';

export async function createUser(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await axios.post('/api/auth/sign-up', {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
}

export async function createTag(tagName: string) {
  const response = await axios.post('/api/tags/', { tagName });
  return response.data;
}
