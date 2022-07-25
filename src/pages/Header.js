import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: ' ',
      loading: true,
    };
  }

  componentDidMount() {
    this.showUser();
  }

  showUser = async () => {
    const user = await getUser();
    const { name } = user;
    this.setState({ userName: name, loading: false });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? (<Loading />)
          : (
            <p data-testid="header-user-name">
              { userName }
            </p>)}
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
