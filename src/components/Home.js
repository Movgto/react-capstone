import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../slices/genreSlice";
import { useEffect } from "react";
import Style from '../styles/home.module.css';
import { useNavigate } from "react-router-dom";
import { setGenre } from "../slices/searchSlice";

const Home = () => {
  const { data, input } = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id, category) => {
    console.log("Redirect!", "ID:", id);
    dispatch(setGenre(category));
    navigate(`/anime/${id}`);
  };

  useEffect(() => {
    if (data.length <= 0) {
      dispatch(fetchData())
        .then(() => {
          console.log(data);
        });
    }
  }, [dispatch, data]);

  const filterData = () => {
    const regex = new RegExp(`${input}`, "gi")
    const filtered = data.filter((item) => regex.test(item.name));
    return filtered;
  };

  return (
    <>
      <ul className={Style.list}>
        {function() {

          let evenCount = 0;
          let oddCount = 0;

          return (filterData().map((item, i) => {
            let even = i % 2 === 0;
            let evenEven = false;
            let oddEven = false;
            if (even) {
              evenCount++;
            } else {
              oddCount++;
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
                } else {
                  return Style.even;
                }
              } else {
                if (oddEven) {
                  return `${Style.odd} ${Style.oddEven}`;
                } else {
                  return Style.odd;
                }
              }
            }

            return (
              <li className={`${Style.item} ${evenNOdds()}`}
                onClick={() => handleClick(item.mal_id, item.name)}>
                {item.name.split("")
                  .map((char) => char.toUpperCase())
                  .join("")}
              </li>);
          }));
        }()
        }
      </ul>
    </>
  );
};

export default Home;