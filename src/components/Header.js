import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Style from '../styles/header.module.css';
import { filter } from '../slices/genreSlice';
import { cleanData } from '../slices/searchSlice';

const Header = () => {
  const { input } = useSelector((state) => state.genre);
  const { current } = useSelector((state) => state.search);
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const changeHandler = (text) => {
    dispatch(filter(text));
  };

  const goBack = () => {
    dispatch(cleanData());
    nav('/');
  };

  if (location.pathname !== '/') {
    return (
      <header className={Style.header}>
        <div className={Style.headerTop}>
          <button
            onClick={() => goBack()}
            type="button"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div className={Style.options}>
            <i className="fa-solid fa-microphone" />
            <i className="fa-solid fa-gear" />
          </div>
        </div>
        <div className={Style.headerBottom}>
          <h2 className={Style.genre}>{current}</h2>
        </div>
      </header>
    );
  }
  return (
    <header className={Style.header}>
      <div className={Style.headerTop}>
        <i className="fa-solid fa-chevron-left" />
        <input
          type="text"
          placeholder="Filter categories by name"
          value={input}
          onChange={(e) => changeHandler(e.target.value)}
        />
        <div className={Style.options}>
          <i className="fa-solid fa-microphone" />
          <i className="fa-solid fa-gear" />
        </div>
      </div>
      <div className={Style.headerBottom}>
        <h2>ANIME BY GENRE</h2>
      </div>
    </header>
  );
};

export default Header;
