const Home = () => {
  return (
    <>
      <header>
        <label for="genre">Filter by genre</label>
        <select id="genre">
          <option selected value="0">All</option>
        </select>
      </header>
    </>
  );
};

export default Home;