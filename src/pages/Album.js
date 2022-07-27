import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      loading: false,
      albumMusic: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ loading: true }, async () => {
      const results = await getMusics(id);
      const favorite = await getFavoriteSongs();
      this.setState({
        artistName: results[0].artistName,
        albumName: results[0].collectionName,
        loading: false,
        albumMusic: results,
        favoriteSongs: favorite,
      });
    });
  }

  render() {
    const {
      artistName,
      albumName,
      loading,
      albumMusic,
      favoriteSongs,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1 data-testid="artist-name">{artistName}</h1>
            <p data-testid="album-name">{albumName}</p>
            {albumMusic
              .filter((music) => music.kind === 'song')
              .map((music, index) => (
                <MusicCard
                  key={ index }
                  songName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  favoriteSongs={ favoriteSongs }
                />
              ))}
          </div>) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
