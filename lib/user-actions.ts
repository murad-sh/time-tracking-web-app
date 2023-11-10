import axios from 'axios';

export const tagsUrlEndpoint = '/api/tags';

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

export async function createTag(tag: string) {
  const response = await axios.post('/api/user/tags/', { tag });
  return response.data;
}
