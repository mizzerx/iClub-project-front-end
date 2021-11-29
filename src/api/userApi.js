import apiClient from './apiClient';

const userApi = {
  getUser: () => apiClient.get('/users/user'),
  getUsers: () => apiClient.get('/users'),
  getUserClubs: () => apiClient.get('/users/user/clubs'),
  updateUser: (user) => apiClient.put('/users/user', user),
};

export default userApi;
