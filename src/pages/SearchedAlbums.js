import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchedAlbumms extends React.Component {
  render() {
    const { searchResults } = this.props;
    return (
      <div>
        {searchResults.length === 0
          ? 'Nenhum álbum foi encontrado'
          : searchResults.map((value) => (
            <div key={ value.collectionPrice }>
              Nome do artista:
              { value.artistName }
              Nome da coleção:
              { value.collectionName }
              Imagem:
              <img src={ value.artworkUrl100 } alt="" />
              <Link
                data-testid={ `link-to-album-${value.collectionId}` }
                to={ `/album/${value.collectionId}` }
              >
                {' '}
                Link do Album
                {' '}

              </Link>

            </div>
          ))}
      </div>
    );
  }
}

SearchedAlbumms.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchedAlbumms;
