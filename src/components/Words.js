import { Component, createRef } from "react";

export default class Words extends Component {
  constructor(props) {
    super(props);

    this.words_section = createRef();
  }

  componentDidUpdate() {
    this.words_section.current.scrollTop =
      this.words_section.current.scrollHeight;
  }

  render() {
    return (
      <section id="words" className="flex" ref={this.words_section}>
        <div className="flex col user-words">
          {this.props.user_words.map(({ word, meaning }, index) => (
            <details className="bg-green" key={`u-${index}`}>
              <summary>{word}</summary>
              <i>: {meaning}</i>
            </details>
          ))}
        </div>
        <div className="flex col opponent-words">
          {this.props.opponent_words.map(({ word, meaning }, index) => (
            <details className="bg-blue" key={`o-${index}`}>
              <summary>{word}</summary>
              <i>: {meaning}</i>
            </details>
          ))}
        </div>
      </section>
    );
  }
}
