import apiClient from './apiClient';

const clubApi = {
  getAllClubs: () => apiClient.get('/clubs'),
  getClub: (clubId) => apiClient.get('/clubs/club', { params: { clubId } }),
  createClub: (club) =>
    apiClient.post('/clubs/club', {
      name: club.name,
      description: club.description,
    }),
  updateClub: (clubId, club) => apiClient.put(`/clubs/club/${clubId}`, club),
  deleteClub: (clubId) => apiClient.delete(`/clubs/club/${clubId}`),
  joinClub: (inviteCode) =>
    apiClient.post(`/clubs/club/join`, {
      inviteCode,
    }),
  addComment: (clubId, comment) =>
    apiClient.post(`/clubs/club/${clubId}/comment`, { comment }),
  leaveClub: (clubId) => apiClient.delete(`/clubs/club/${clubId}/leave`),
  removeMember: (clubId, memberId) =>
    apiClient.delete(`/clubs/club/${clubId}/member/${memberId}`),
};

export default clubApi;
