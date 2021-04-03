const SearchBar = ({ keyword, setKeyword }) => {
  return (
    <input
      className="searchBarInput"
      key="searchBar"
      placeholder="&#xf002;   Search..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
