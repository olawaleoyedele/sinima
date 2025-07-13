// src/utils/handleRegisterError.js
export default function handleRegisterError(err) {
  if (err.response && err.response.data && err.response.data.error) {
    if (err.response.data.error.includes('username')) {
      return 'Username already exists.';
    }
    if (err.response.data.error.includes('email')) {
      return 'Email already exists.';
    }
    return err.response.data.error;
  }
  return 'Registration failed. Please try again.';
}
