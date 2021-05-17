import { FC, createContext } from 'react';
import { useLocalStorage } from '../hooks';

interface initialStateType {
  currentUser: null;
  setCurrentUser: (userId: string | null) => void;
}

interface AuthProviderType {
  user: string | null;
}

const initialState = {
  currentUser: null,
  setCurrentUser: () => {},
};

export const AuthContext = createContext<initialStateType>(initialState);

export const AuthProvider: FC<AuthProviderType> = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('user', user);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>
  );
};
