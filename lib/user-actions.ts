import { postRequest } from './utils/request';

export function createUser(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  return postRequest('/api/auth/sign-up', {
    name,
    email,
    password,
    confirmPassword,
  });
}

export function createTag(tagName: string) {
  return postRequest('/api/tags/', { tagName });
}
