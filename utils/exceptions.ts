export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'CustomError';
  }
}
export class AuthenticationError extends CustomError {
  constructor(message = 'Authentication Failed') {
    super(message, 401);
    this.name = 'AuthError';
  }
}

export class ResourceConflictError extends CustomError {
  constructor(message = 'Resource in Use') {
    super(message, 409);
    this.name = 'ResourceConflict';
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation Failed') {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class InternalServerError extends CustomError {
  constructor(message = 'An unexpected error occurred') {
    super(message, 500);
    this.name = 'InternalServerError';
  }
}
