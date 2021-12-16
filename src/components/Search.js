import { memo } from "react";

const Search = memo(function ({ changeHandler }) {
  function setSearchedPlayer(event) {
    event.preventDefault();
    changeHandler(event.target.value.trim().toLowerCase());
  }

  return (
    <section id="search">
      <input
        type="search"
        className="search-text"
        placeholder="Seach player name.."
        onChange={setSearchedPlayer}
      />
    </section>
  );
});

export default Search;
