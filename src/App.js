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
  constructor() {
    super();

    this.state = {
      loginButtonDisabled: true,
      loginName: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.loginConditions());
  }

  loginConditions = () => {
    const {
      loginName,
    } = this.state;
    const minLength = 3;

    if (loginName.length >= minLength) {
      this.setState({ loginButtonDisabled: false });
    } else {
      this.setState({ loginButtonDisabled: true });
    }
  }

  onLoginClick = () => {

  }

  render() {
    const { loginButtonDisabled, loginName } = this.state;

    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              onInputChange={ this.onInputChange }
              onLoginClick={ this.onLoginClick }
              loginName={ loginName }
              loginButtonDisabled={ loginButtonDisabled }
            />) }
          />
          ;

          <Route exact path="/Album/:id" component={ Album } />
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
