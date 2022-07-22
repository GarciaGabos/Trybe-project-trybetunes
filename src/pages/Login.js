import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import { createUser } from '../services/userAPI';

class Login extends React.Component {
  render() {
    const { loginButtonDisabled, loginName, onInputChange, onLoginClick } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <input
            name="loginName"
            type="text"
            data-testid="login-name-input"
            value={ loginName }
            onChange={ onInputChange }
          />
          <button
            name="loginButton "
            type="button"
            data-testid="login-submit-button"
            disabled={ loginButtonDisabled }
            onClick={ onLoginClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string.isRequired,
  loginButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default Login;
