import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import { Home } from './pages';
import { PageNotFound } from './pages';
import { LoginPage } from './pages';
import { RegisterPage } from './pages';
import { Items } from './pages';

// Components
import { SideNav } from './components/SideNav/SideNav';
import { GuardedRoute } from './containers/GuardedRoute';
const App: FC = () => {
  const user = localStorage.getItem('user');

  return (
    <AuthProvider user={user}>
      <Router>
        <div className="flex">
          <SideNav />
          <div className="w-full">
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <GuardedRoute exact path="/" component={Home} />
              <GuardedRoute exact path="/items" component={Items} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
