const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <article className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through 300+ movies online"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </div>
    </article>
  );
};

export default Search;
