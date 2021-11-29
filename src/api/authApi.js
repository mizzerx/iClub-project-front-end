import apiClient from './apiClient';

const authApi = {
  login: (email, password) => {
    return apiClient.post('/auth/login', {
      email,
      password,
    });
  },
  register: (name, email, password, passwordConfirmation) => {
    return apiClient.post('/users/user', {
      name,
      email,
      password,
      passwordConfirmation,
    });
  },
};

export default authApi;
