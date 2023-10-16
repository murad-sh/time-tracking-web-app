export class AuthError extends Error {
  constructor(message = 'Authentication Failed') {
    super(message);
    this.name = 'AuthError';
  }
}
