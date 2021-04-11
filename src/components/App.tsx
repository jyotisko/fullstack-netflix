import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './../contexts/AuthContext';
import Landing from './landing/Landing';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import Home from './home/Home';
import Search from './search/Search';
import Account from './account/Account';
import Bookmark from './bookmark/Bookmark';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/search' component={Search} />
            <Route path='/account' component={Account} />
            <Route path='/bookmark' component={Bookmark} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
