import { useState } from "react";
import Style from '../styles/anime.module.css';

const AnimeItem = ({ item }) => {
  const [infoToggle, setInfoToggle] = useState(false);
  const [trailerToggle, setTrailerToggle] = useState(false);

  return (
    <li className={Style.item}>
      <h3 className={Style.title}>{item.title}</h3>
      <div className={Style.image}>
        <img 
        src={item.images.jpg.image_url}
        alt="Anime cover image" />
      </div>
      <div className={Style.info}>
        {
          infoToggle ?
            (
              <>
                <p>{item.synopsis}</p>
                <button onClick={() => setInfoToggle(!infoToggle)}
                  type="button">Back</button>
              </>
            )
            : trailerToggle ?
              (
                <>
                  <iframe
                    height="300"
                    src={item.trailer.embed_url}
                    title="Anime Trailer"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                  </iframe>
                  <button onClick={() => setTrailerToggle(!trailerToggle)}
                    type="button">Back</button>
                </>
              )
              :
              (
                <>
                  <h3>{`Year: ${item.year ? item.year : "Not found"}`}</h3>
                  <h3>{`Score: ${item.score ? item.score : "Not found"}`}</h3>
                  <h3>{`Scored by: ${item.scored_by ? item.scored_by : "Not found"}`}</h3>
                  <h3>{`Episodes: ${item.episodes ? item.episodes : "Not found"}`}</h3>
                  <h3>{`Rating: ${item.rating ? item.rating : "Not found"}`}</h3>
                  <h3>{`Status: ${item.status ? item.status : "Not found"}`}</h3>
                  <button onClick={() => setInfoToggle(!infoToggle)}
                    type="button">Synopsis</button>
                  <button onClick={() => setTrailerToggle(!trailerToggle)}
                    type="button">Trailer</button>
                </>
              )

        }
      </div>
    </li>
  );
};

export default AnimeItem;