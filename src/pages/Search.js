import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import SearchedAlbums from './SearchedAlbums';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchButton: true,
      searchName: '',
      loading: false,
      artistSearch: '',
      searchResults: [],
    };
  }

  searchArtist = async () => {
    const { searchName } = this.state;
    this.setState(
      {
        loading: true,
        artistSearch: searchName,
        searchName: '',
        searchButton: true,
      },
      async () => {
        this.setState({
          searchResults: await searchAlbumsAPI(searchName),
          loading: false,
        });
      },
    );
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
    const { searchButton, searchName, artistSearch, loading, searchResults } = this.state;

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
            onClick={ this.searchArtist }
          >
            Pesquisar

          </button>

        </form>
        {loading ? (
          <Loading />
        ) : (artistSearch && (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              { artistSearch }
              {' '}
            </p>
            <SearchedAlbums searchResults={ searchResults } />
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
