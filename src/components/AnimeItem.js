import { useState } from 'react';
import PropTypes from 'prop-types';
import Style from '../styles/anime.module.css';

const AnimeItem = ({ item }) => {
  const [infoToggle, setInfoToggle] = useState(false);
  const [trailerToggle, setTrailerToggle] = useState(false);

  const info = () => {
    if (infoToggle) {
      return (
        <>
          <p>{item.synopsis}</p>
          <button
            onClick={() => setInfoToggle(!infoToggle)}
            type="button"
            className={Style.back}
          >
            <i className="fa-solid fa-reply" />
          </button>
        </>
      );
    } if (trailerToggle) {
      return (
        <>
          <iframe
            height="300"
            src={item.trailer.embed_url}
            title="Anime Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <button
            onClick={() => setTrailerToggle(!trailerToggle)}
            type="button"
            className={Style.back}
          >
            <i className="fa-solid fa-reply" />
          </button>
        </>
      );
    }
    return (
      <>
        <h3>{`Year: ${item.year ? item.year : 'Not found'}`}</h3>
        <h3>{`Score: ${item.score ? item.score : 'Not found'}`}</h3>
        <h3>{`Scored by: ${item.scored_by ? item.scored_by : 'Not found'}`}</h3>
        <h3>{`Episodes: ${item.episodes ? item.episodes : 'Not found'}`}</h3>
        <h3>{`Rating: ${item.rating ? item.rating : 'Not found'}`}</h3>
        <h3>{`Status: ${item.status ? item.status : 'Not found'}`}</h3>
        <button
          onClick={() => setInfoToggle(!infoToggle)}
          type="button"
          className={Style.infoButtons}
        >
          Synopsis
        </button>
        <button
          onClick={() => setTrailerToggle(!trailerToggle)}
          type="button"
          className={Style.infoButtons}
        >
          Trailer
        </button>
      </>
    );
  };

  return (
    <li className={Style.item}>
      <h3 className={Style.title}>{item.title}</h3>
      <div className={Style.image}>
        <img
          src={item.images.jpg.image_url}
          alt="Anime cover"
        />
      </div>
      <div className={Style.info}>
        {
          info()
        }
      </div>
    </li>
  );
};

AnimeItem.propTypes = {
  item: PropTypes.shape().isRequired,
};

export default AnimeItem;
