import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      loading: true,
    };
  }

  componentDidMount = async () => {
    const userInfo = await getUser();
    this.setState({ userInfo, loading: false });
  }

  render() {
    const { loading,
      userInfo: { name,
        email,
        image,
        description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <img data-testid="profile-image" src={ image } alt={ `${name}` } />
              <h1>{ name }</h1>
              <p>{ email }</p>
              <p>{ description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
