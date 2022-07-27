import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          ;

          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          ;
          <Route exact path="/Favorites" component={ Favorites } />
          ;
          <Route exact path="/Profile" component={ Profile } />
          ;
          <Route exact path="/Profile/edit" component={ ProfileEdit } />
          ;
          <Route exact path="/Search" component={ Search } />
          ;
          <Route path="/*" component={ NotFound } />
          ;
        </Switch>
      </>);
  }
}

export default App;
