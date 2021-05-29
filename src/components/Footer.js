import { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer flex">
        <span>
          <a
            href="https://github.com/mochatek"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa fa-github-square"></i>
          </a>
          <a
            href="https://in.linkedin.com/in/akash-s-panickar-9893ab155"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa fa-linkedin-square"></i>
          </a>
        </span>
        <span>&copy; MochaTek 2021</span>
      </div>
    );
  }
}
