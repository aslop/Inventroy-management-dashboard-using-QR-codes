import { ComponentType, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks';

type HOCProps = {
  component: ComponentType<any>;
  path: string;
  exact?: any; //TODO (?)
};

export const GuardedRoute: FC<HOCProps> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};
