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
      <header className={Style.header2}>
        <button onClick={() => nav("/")}>Go back</button>
        <h2 className={Style.genre}>{current}</h2>
      </header>
    );
  }
  return (
    <header className={Style.header}>
      <input type="text"
        placeholder="Filter categories by name"
        value={input}
        onChange={(e) => changeHandler(e.target.value)}/>
    </header>
  );
};

export default Header;