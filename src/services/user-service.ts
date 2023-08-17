import api from './api';

interface UserReponse {
  name: string;
  email: string;
}

export const fetchUsers = async (): Promise<UserReponse> => {
  const response = await api.get<UserReponse>('/read-user');
  return response.data;
};
