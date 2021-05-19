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
import { Item } from './pages';
import { Scan } from './pages';

// Components
import { MainNav } from './components/MainNav/MainNav';
import { GuardedRoute } from './containers/GuardedRoute';
const App: FC = () => {
  const user = localStorage.getItem('user');

  return (
    <AuthProvider user={user}>
      <Router>
        <div>
          <MainNav />
          <div>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <GuardedRoute exact path="/" component={Home} />
              <GuardedRoute exact path="/scan" component={Scan} />
              <GuardedRoute exact path="/items" component={Items} />
              <GuardedRoute exact path="/items/:id" component={Item} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
