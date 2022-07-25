import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginButtonDisabled: true,
      loginName: '',
      loading: false,
    };
  }

  onInputChange = ({ target }) => {
    const minLength = 3;
    if (target.value.length >= minLength) {
      this.setState({ loginButtonDisabled: false,
        loginName: target.value });
    } else {
      this.setState({ loginButtonDisabled: true,
        loginName: target.value });
    }
  }

  onLoginClick = async () => {
    const { history } = this.props;
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    history.push('/search');
  }

  render() {
    const { loginButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? (<Loading />) : (
            <form>
              <input
                name="loginName"
                type="text"
                data-testid="login-name-input"
                onChange={ this.onInputChange }
              />
              <button
                name="loginButton "
                type="button"
                data-testid="login-submit-button"
                disabled={ loginButtonDisabled }
                onClick={ this.onLoginClick }
              >
                Entrar

              </button>
            </form>)
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
