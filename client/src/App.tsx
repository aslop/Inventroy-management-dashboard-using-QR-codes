import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import { Home } from './pages';
import { PageNotFound } from './pages';
import { LoginPage } from './pages';
import { RegisterPage } from './pages';

// Components
import { MainNav } from './components/MainNav';
import { GuardedRoute } from './containers/GuardedRoute';

const App: FC = () => {
  const user = localStorage.getItem('user');

  return (
    <AuthProvider user={user}>
      <Router>
        <MainNav />
        <div>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <GuardedRoute exact path="/" component={Home} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
