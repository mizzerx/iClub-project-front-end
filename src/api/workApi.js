import apiClient from './apiClient';

const workApi = {
  getWorks: (clubId) => apiClient.get(`/works/club/${clubId}`),
  getWork: (workId) => apiClient.get(`/works/${workId}`),
  createWork: (work, clubId) => apiClient.post(`/works/club/${clubId}`, work),
};

export default workApi;
