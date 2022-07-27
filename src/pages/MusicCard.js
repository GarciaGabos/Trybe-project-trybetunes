import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { trackId, favoriteSongs } = this.props;
    this.setState({
      favorite: favoriteSongs.some(({ trackId: id }) => id === trackId),
    });
  }

  fetchFavorite = async () => {
    const { trackId } = this.props;
    await addSong(trackId);
    this.setState({ loading: false });
  };

  onCheck = ({ target }) => {
    const { checked } = target;
    this.setState({ loading: true, favorite: checked }, async () => {
      const { songName, previewUrl, trackId } = this.props;
      const { favorite } = this.state;
      if (favorite) {
        await addSong({ trackId, songName, previewUrl });
      } else {
        await removeSong({ trackId, songName, previewUrl });
      }
      this.setState({ loading: false });
    });
  };

  render() {
    const { songName, previewUrl, trackId } = this.props;
    const { favorite,
      loading } = this.state;
    return (
      <div>
        <h1>{songName}</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        {loading ? (
          <Loading />
        ) : (
          <label htmlFor={ `${trackId}` }>
            Favorita
            <input
              type="checkbox"
              id={ `${trackId}` }
              data-testid={ `checkbox-music-${trackId}` }
              checked={ favorite }
              onChange={ this.onCheck }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
