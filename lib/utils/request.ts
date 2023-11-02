import { ResourceConflictError } from './exceptions';

export async function postRequest(url: string, body: { [key: string]: any }) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 409) {
      throw new ResourceConflictError(data.message);
    } else {
      throw new Error(data.message || 'Request failed');
    }
  }

  return data;
}

export async function getRequest(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Request failed with status ' + response.status
    );
  }

  return data;
}
