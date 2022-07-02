export interface User {
  _id: string,
  email: string,
  avatar: string,
  displayName: string,
  token: string,
  role: string,
  facebookId: null | string
}

export interface FacebookUserData {
  authToken: string,
  id: string,
  email: string,
  name: string,
  avatar: string
}

export interface RegisterUserData {
  [key: string]: any,
  email: string,
  password: string,
  avatar: File | null,
  displayName: string,
  role: string
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface LoginError {
  error: string
}
