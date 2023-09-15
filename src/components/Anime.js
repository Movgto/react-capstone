import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { byGenre } from "../slices/searchSlice";
import { useEffect } from "react";
import { useState } from "react";
import Style from '../styles/anime.module.css';
import AnimeItem from "./AnimeItem";

const Anime = () => {
  const { data } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(id);
    dispatch(byGenre({ id, page }))
      .then(() => setLoading(false)); // byGender parameters: id, page number
    console.log(data);
  }, []);

  const changePage = (id, pageTo) => {
    dispatch(byGenre({ id, page: pageTo }))
    setPage(pageTo);
    console.log("Page:", page);
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
    for (let i = first; i <= last; i++) {
      array.push(
        <button className={i === page ? Style.current : Style.number} onClick={() => changePage(id, i)}>
          {i}
        </button>
      );
    }

    return array;
  };

  if (loading) {
    return (
      <div className={Style.loading}>
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }
  if (data.data) {
    return (
      <>
        <ul className={Style.list}>
          {data.data.map((item) => (
            <AnimeItem item={item} />
          ))}
        </ul>
        <div className={Style.options}>
          <h3>Page {page}/{data.pagination.last_visible_page}</h3>
          {page > 1 &&
            <button className={Style.arrows} onClick={() => changePage(id, 1)}>
              <i className="fa-solid fa-backward-step"></i>
            </button>}
          {page > 1 &&
            <button className={Style.arrows} onClick={() => changePage(id, page - 1)}>
              <i className="fa-solid fa-backward"></i>
            </button>}
          {page < Number(data.pagination.last_visible_page) &&
            <button className={Style.arrows} onClick={() => changePage(id, page + 1)}>
              <i className="fa-solid fa-forward"></i>
            </button>}
          {page < Number(data.pagination.last_visible_page) &&
            <button className={Style.arrows} onClick={() => changePage(id, data.pagination.last_visible_page)}>
              <i className="fa-solid fa-forward-step"></i>
            </button>}
          {
            createNumButtons(page, data.pagination.last_visible_page)
          }
        </div>
      </>
    );
  }
  return <h3>There was an error when receiving the data</h3>;
};

export default Anime;