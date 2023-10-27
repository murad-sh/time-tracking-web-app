import { ResourceConflictError } from './utils/exceptions';

export async function createUser(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, confirmPassword }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 409) {
      throw new ResourceConflictError(data.message);
    } else {
      throw new Error(data.message || 'Sign-up request failed');
    }
  }

  return data;
}
