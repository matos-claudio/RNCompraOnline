import api from './api';
import {IUserReponse, ILoginUser} from '../common/user-interface';

export const fetchUsers = async (): Promise<IUserReponse> => {
  const response = await api.get<IUserReponse>('/read-user');
  return response.data;
};

export const login = async (user: ILoginUser): Promise<Number> => {
  const response = await api.post('/login-user', user);
  return response.status;
};
