import { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <section id="search">
        <input
          type="search"
          className="search-text"
          placeholder="Seach player name.."
          onChange={(event) => {
            event.preventDefault();
            this.props.changeHandler(event.target.value.trim().toLowerCase());
          }}
        />
      </section>
    );
  }
}
