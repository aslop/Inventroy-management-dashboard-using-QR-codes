import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router';
import axios from 'axios';

export const useAuth = () => {
  const history = useHistory();

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    const {
      data: { userId },
    } = await axios.post(
      '/api/auth/login',
      { email, password },
      {
        withCredentials: true,
      }
    );

    setCurrentUser(userId);
    history.push('/');
  };

  const register = async (email: string, password: string) => {
    const {
      data: { userId },
    } = await axios.post(
      '/api/auth/register',
      { email, password },
      {
        withCredentials: true,
      }
    );

    setCurrentUser(userId);
    history.push('/');
  };

  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });

    setCurrentUser(null);
    history.push('/login');
  };

  return { currentUser, login, logout, register };
};
