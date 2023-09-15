import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Anime from "./components/Anime";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="anime/:id" element={<Anime />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
