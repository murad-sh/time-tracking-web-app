import { ResourceConflictError } from './utils/exceptions';
import { postRequest } from './utils/request';

export async function createUser(
  tagName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({ tagName, email, password, confirmPassword }),
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

export function createTag(tagName: string) {
  return postRequest('/api/user/create-tag', { tagName });
}

// export async function createTag(tagName: string) {
//   const response = await fetch('/api/user/create-tag', {
//     method: 'POST',
//     body: JSON.stringify({ tagName }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Create tag request failed');
//   }

//   return data;
// }
