import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../slices/genreSlice';
import Style from '../styles/home.module.css';
import { setGenre } from '../slices/searchSlice';
import AnimStyle from '../styles/anime.module.css';

const Home = () => {
  const { data, input, loading } = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id, category) => {
    dispatch(setGenre(category));
    navigate(`/anime/${id}`);
  };

  useEffect(() => {
    if (data.length <= 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  const filterData = () => {
    const regex = new RegExp(`${input}`, 'gi');
    const filtered = data.filter((item) => regex.test(item.name));
    return filtered;
  };

  const list = () => {
    let evenCount = 0;
    let oddCount = 0;

    return (filterData().map((item, i) => {
      const even = i % 2 === 0;
      let evenEven = false;
      let oddEven = false;
      if (even) {
        evenCount += 1;
      } else {
        oddCount += 1;
      }

      if (evenCount % 2 === 0 && evenCount > 0) {
        evenEven = true;
      } else {
        evenEven = false;
      }

      if (oddCount % 2 === 0 && oddCount > 0) {
        oddEven = true;
      } else {
        oddEven = false;
      }

      const evenNOdds = () => {
        if (even) {
          if (evenEven) {
            return `${Style.even} ${Style.evenEven}`;
          }
          return Style.even;
        }
        if (oddEven) {
          return `${Style.odd} ${Style.oddEven}`;
        }
        return Style.odd;
      };

      return (
        <li
          key={item.mal_id}
          className={`${Style.item} ${evenNOdds()}`}
        >
          <button
            onClick={() => handleClick(item.mal_id, item.name)}
            type="button"
          >
            <h3>
              {item.name.split('')
                .map((char) => char.toUpperCase())
                .join('')}
            </h3>
            <i className={`fa-solid fa-arrow-right-to-bracket ${Style.enter}`} />
          </button>
        </li>
      );
    }));
  };

  if (loading) {
    return (
      <div className={AnimStyle.loading}>
        <i className="fa-solid fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <>
      <ul
        className={Style.list}
        data-testid="list"
      >
        {list()}
      </ul>
    </>
  );
};

export default Home;
