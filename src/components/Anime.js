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
    return (<div className={Style.list}><h3>Loading...</h3></div>);
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
          <button onClick={() => changePage(id, 1)}>First</button>
          {page > 1 &&
            <button onClick={() => changePage(id, page - 1)}>Previous</button>}
          <h3>Page {page}</h3>
          {page < Number(data.pagination.last_visible_page) &&
            <button onClick={() => changePage(id, page + 1)}>Next</button>}
          <button onClick={() => changePage(id, data.pagination.last_visible_page)}>Last</button>
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