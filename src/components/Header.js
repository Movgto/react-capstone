import Style from '../styles/header.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../slices/genreSlice';

const Header = () => {
  const { input } = useSelector((state) => state.genre);
  const { current } = useSelector((state) => state.search);
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const changeHandler = (text) => {
    dispatch(filter(text));
    console.log(input);
  }

  if (location.pathname !== "/") {
    return (
      <header className={Style.header}>
        <div className={Style.headerTop}>
          <button onClick={() => nav("/")}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className={Style.options}>
            <i className="fa-solid fa-microphone"></i>
            <i className="fa-solid fa-gear"></i>
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
        <i className="fa-solid fa-chevron-left"></i>
        <input type="text"
          placeholder="Filter categories by name"
          value={input}
          onChange={(e) => changeHandler(e.target.value)} />
        <div className={Style.options}>
          <i className="fa-solid fa-microphone"></i>
          <i className="fa-solid fa-gear"></i>
        </div>
      </div>
      <div className={Style.headerBottom}>
        <h2>ANIME BY GENRE</h2>
      </div>
    </header>
  );
};

export default Header;