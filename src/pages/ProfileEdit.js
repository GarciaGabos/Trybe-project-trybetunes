import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
      buttonDisabled: false,
    };
  }

  componentDidMount = async () => {
    const response = await getUser();
    this.setState({
      name: response.name,
      email: response.email,
      description: response.description,
      image: response.image,
      loading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  }

  handleSubmit = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({ loading: true }, async () => {});
    await updateUser({ name, email, image, description });
    history.push('/profile');
  }

  validateButton = () => {
    const { name, email, description, image } = this.state;
    if (name.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      loading,
      buttonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading />
          : (
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  data-testid="edit-input-name"
                  value={ name }
                  name="name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="description">
                Descrição
                <textarea
                  name="description"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  data-testid="edit-input-email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                Image
                <input
                  type="text"
                  name="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                onClick={ this.handleSubmit }
                data-testid="edit-button-save"
                disabled={ buttonDisabled }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }),
}.isRequired;

export default ProfileEdit;
