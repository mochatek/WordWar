import { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <section id="search">
        <input
          type="text"
          className="search-text"
          placeholder="Seach player name.."
        />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </section>
    );
  }
}
