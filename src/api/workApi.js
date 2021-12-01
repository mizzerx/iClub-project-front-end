import apiClient from './apiClient';

const workApi = {
  getWorks: (clubId) => apiClient.get(`/works/club/${clubId}`),
  getWork: (workId) => apiClient.get(`/works/${workId}`),
  createWork: (work, clubId) => apiClient.post(`/works/club/${clubId}`, work),
  createWorkAnswer: (workId, workAnswer) =>
    apiClient.post(`/works/${workId}/answer`, workAnswer),
  getWorkAnswer: (workId) => apiClient.get(`/works/${workId}/answer`),
  updateWorkAnswer: (workId, answerId, workAnswer) =>
    apiClient.put(`/works/${workId}/answer/${answerId}`, workAnswer),
  getWorkAnswerByUser: (workId, userId) =>
    apiClient.get(`/works/${workId}/answer/user/${userId}`),
};

export default workApi;
