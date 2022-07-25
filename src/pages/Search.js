import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchButton: true,
      searchName: '',
    };
  }

  checkLength = ({ target }) => {
    const minLength = 2;
    if (target.value.length >= minLength) {
      this.setState({ searchButton: false,
        searchName: target.value });
    } else {
      this.setState({ searchButton: true,
        searchName: target.value });
    }
  }

  render() {
    const { searchButton, searchName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchName }
            onChange={ this.checkLength }
          />
          <button
            disabled={ searchButton }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar

          </button>

        </form>
      </div>
    );
  }
}

export default Search;
