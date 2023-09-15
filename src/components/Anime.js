import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { byGenre } from '../slices/searchSlice';

import Style from '../styles/anime.module.css';
import AnimeItem from './AnimeItem';

const Anime = () => {
  const { data, loading, error } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (data.length <= 0) {
      dispatch(byGenre({ id, page }));
    } // byGender parameters: id, page number
  }, [dispatch, data, id, page]);

  const changePage = (id, pageTo) => {
    dispatch(byGenre({ id, page: pageTo }));
    setPage(pageTo);
  };

  const createNumButtons = (current, lastPage) => {
    const array = [];
    let first = current - 10;
    let last = current + 10;
    if (first <= 0) {
      first = 1;
    }
    if (last >= lastPage) {
      last = lastPage;
    }
    for (let i = first; i <= last; i += 1) {
      array.push(
        <button
          className={i === page ? Style.current : Style.number}
          onClick={() => changePage(id, i)}
          type="button"
        >
          {i}
        </button>,
      );
    }

    return array;
  };

  if (loading) {
    return (
      <div className={Style.loading}>
        <i className="fa-solid fa-spinner fa-spin" />
      </div>
    );
  }
  if (data.data) {
    return (
      <>
        <ul className={Style.list}>
          {data.data.map((item) => (
            <AnimeItem item={item} key={item.mal_id} />
          ))}
        </ul>
        <footer
          className={
            expanded
              ? `${Style.options}`
              : `${Style.options} ${Style.closed}`
        }
        >
          <button
            className={Style.expand}
            onClick={() => setExpanded(!expanded)}
            type="button"
          >
            {expanded
              ? <i className="fa-solid fa-chevron-down" />
              : <i className="fa-solid fa-chevron-up" />}
          </button>
          <h3>
            Page
            &nbsp;
            {page}
            /
            {data.pagination.last_visible_page}
          </h3>
          {page > 1
            && (
              <button
                className={Style.arrows}
                onClick={() => changePage(id, 1)}
                type="button"
              >
                <i className="fa-solid fa-backward-step" />
              </button>
            )}
          {page > 1
            && (
              <button
                className={Style.arrows}
                onClick={() => changePage(id, page - 1)}
                type="button"
              >
                <i className="fa-solid fa-backward" />
              </button>
            )}
          {page < Number(data.pagination.last_visible_page)
            && (
              <button
                className={Style.arrows}
                onClick={() => changePage(id, page + 1)}
                type="button"
              >
                <i className="fa-solid fa-forward" />
              </button>
            )}
          {page < Number(data.pagination.last_visible_page)
            && (
              <button
                className={Style.arrows}
                onClick={() => changePage(id, data.pagination.last_visible_page)}
                type="button"
              >
                <i className="fa-solid fa-forward-step" />
              </button>
            )}
          {
            createNumButtons(page, data.pagination.last_visible_page)
          }
        </footer>
      </>
    );
  }

  return (
    <div className={Style.error}>
      <h3>{error}</h3>
    </div>
  );
};

export default Anime;
