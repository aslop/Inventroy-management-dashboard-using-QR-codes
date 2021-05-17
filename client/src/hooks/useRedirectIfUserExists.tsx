import { useAuth } from './useAuth';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

export const useRedirectIfUserExists = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);
};
