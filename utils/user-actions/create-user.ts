export async function createUser(
  name: string,
  email: string,
  password: string,
  confirmedPassword: string
) {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, confirmedPassword }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const validationErrors = await response.json();
      throw new Error(`Validation error: ${JSON.stringify(validationErrors)}`);
    } else if (response.status === 500) {
      throw new Error('Server error');
    } else {
      throw new Error('Sign-up request failed');
    }
  }

  const data = await response.json();
  return data;
}
