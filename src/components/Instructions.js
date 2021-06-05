import { Component } from "react";

export default class Instructions extends Component {
  render() {
    return (
      <div className="modalDialog" style={{ margin: " 2rem 0.5rem" }}>
        <div
          className="flex col"
          style={{
            background: "black",
            color: "grey",
            border: "1px solid white",
          }}
        >
          <h3 className="flex" style={{ width: "95%" }}>
            <span
              style={{
                color: "skyblue",
                marginBottom: "0",
                textDecoration: "underline",
              }}
            >
              INSTRUCTIONS
            </span>
            <span
              style={{ color: "grey", position: "absolute", right: "2rem" }}
              onClick={() => this.props.closeHandler()}
            >
              <i className="fa fa-times-circle"></i>
            </span>
          </h3>
          <ol>
            <li>
              This is a simple multiplayer word game, intended to improve
              <mark>English vocabulary</mark>
            </li>
            <li>
              Any words found in a standard dictionary are permitted - except
              those that are <mark>Noun</mark>/<mark>Abbreviation</mark>/
              <mark>Cross Reference</mark>
            </li>
            <li>
              A word can only be used <mark>once</mark> in a game
            </li>
            <li>
              A player will be chosen at random to start the game and he/she
              must enter a permitted word<sup>2</sup> before the{" "}
              <mark>timer</mark> runs out
            </li>
            <li>
              A simple click on the word will yield it's <mark>meaning</mark>
            </li>
            <li>
              After a valid entry, the turn will go to the second player and
              he/she is required to enter a word{" "}
              <mark>
                starting with the letter that the previous one ended with
              </mark>
            </li>
            <li>
              A <mark>green overlay</mark> over the input field denotes our turn
            </li>
            <li>
              The game will continue until either player{" "}
              <mark>quits or the timer runs out</mark> in which case the other
              player <b style={{ color: "green" }}>WINS!</b>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}
