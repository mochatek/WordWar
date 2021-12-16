import { Fragment, useState, useEffect, useCallback } from "react";

import Auth from "../services/auth";
import Api from "../services/api";
import socket from "../services/socket";

import Profile from "./Profile";
import Message from "./Message";
import Search from "./Search";
import Opponents from "./Opponents";
import Challenge from "./Challenge";
import Game from "./Game";
import Footer from "./Footer";

const SELECT_SOUND = new Audio(`${process.env.PUBLIC_URL}/sounds/select.ogg`);
const CLICK_SOUND = new Audio(`${process.env.PUBLIC_URL}/sounds/click.ogg`);
const MATCH_SOUND = new Audio(`${process.env.PUBLIC_URL}/sounds/challenge.ogg`);

export default function Home() {
  const [user, setUser] = useState({
    name: Auth.getUser(),
    matches: 0,
    wins: 0,
    points: 0,
    rank: 0,
  });
  const [opponents, setOpponents] = useState([]);
  const [filtered_opponents, setFilteredOpponents] = useState([]);
  const [opponent_selected, setOpponentSelected] = useState(null);
  const [challenging, setChallenging] = useState(null);
  const [challenged_by, setChallengedBy] = useState(null);
  const [message, setMessage] = useState(null);
  const [game, setGame] = useState(null);
  const [loader, setLoader] = useState(true);

  /* To deal with stale closure of state in socket callback, either:
    =>  const opponentsRef = useRef(opponents); and then update ref when opponents change
    =>  Use functional state update in callback
  */

  useEffect(() => {
    socket.emit("join", user.name);
    socket.on("challenge", showChallenge);
    socket.on("sync", syncOpponents);

    (async () => {
      const { error: stats_error, stats } = await Api.get("stats");
      if (!stats_error) setUser((prev) => ({ ...prev, ...stats }));

      setLoader(true);

      const { error: op_error, opponents: my_opponents } = await Api.get(
        "opponents"
      );
      if (!op_error) {
        setOpponents(my_opponents);
      }
    })();

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    setFilteredOpponents(opponents);
    setLoader(false);
  }, [opponents]);

  function syncOpponents(players) {
    setLoader(true);
    setOpponents((prev) => {
      const my_opponents = [...prev];

      players.forEach((player) => {
        const [name, status] = player;
        const op_player = my_opponents.find((op) => op.name === name);
        if (op_player) {
          op_player.status = status;
        } else {
          my_opponents.push({ name, points: 0, status });
        }
      });

      return my_opponents;
    });
  }

  const searchOpponent = useCallback(
    (player_name) => {
      if (player_name) {
        const matching_players = opponents.filter((op) =>
          op.name.includes(player_name)
        );
        setFilteredOpponents(matching_players);
      } else {
        setFilteredOpponents(opponents);
      }
    },
    [opponents]
  );

  function selectOpponent(name) {
    if (!challenging) {
      SELECT_SOUND.play();
      setOpponentSelected(name);
    }
  }

  function deselectOpponent() {
    CLICK_SOUND.play();
    setOpponentSelected(null);
  }

  async function refreshOpponents() {
    setLoader(true);
    const { error: op_error, opponents: new_opponents } = await Api.get(
      "opponents"
    );
    if (!op_error) setOpponents(new_opponents);
  }

  function confirmChallenge() {
    socket.emit("challenge", {
      status: "request",
      from: user.name,
      to: opponent_selected,
    });

    CLICK_SOUND.play();
    setChallenging(opponent_selected);
    setOpponentSelected(null);
  }

  function cancelChallenge() {
    socket.emit("challenge", {
      status: "cancel",
      from: user.name,
      to: challenging,
    });

    CLICK_SOUND.play();
    setChallenging(null);
    setOpponentSelected(null);
  }

  function showChallenge({ status, from: player, room }) {
    MATCH_SOUND.play();

    switch (status) {
      case "request":
        setChallengedBy(player);
        break;

      case "cancel":
        setChallengedBy(null);
        break;

      case "reject":
      case "accept":
        setChallenging(null);
        setMessage(`${player} ${status}ed the challenge`);
        break;

      case "start":
        startGame(player, room);
        break;

      default:
        console.error("Unknown status");
        break;
    }
  }

  function acceptChallenge() {
    socket.emit("challenge", {
      status: "accept",
      from: user.name,
      to: challenged_by,
    });

    CLICK_SOUND.play();
    setChallengedBy(null);
  }

  function rejectChallenge() {
    socket.emit("challenge", {
      status: "reject",
      from: user.name,
      to: challenged_by,
    });

    CLICK_SOUND.play();
    setChallengedBy(null);
  }

  function closeMessage() {
    CLICK_SOUND.play();
    setMessage(null);
  }

  function startGame(starting_player, room) {
    socket.off("challenge", showChallenge);
    socket.off("sync", syncOpponents);
    setMessage(null);
    setGame({ turn: starting_player, room });
  }

  if (game)
    return (
      <Game
        socket={socket}
        user={user.name}
        room={game.room}
        turn={game.turn}
      />
    );

  return (
    <Fragment>
      <Profile {...user} />

      <Search changeHandler={searchOpponent} />

      {(challenging || challenged_by || message) && (
        <Message
          listeners={[challenging, challenged_by, message]}
          handlers={[
            cancelChallenge,
            acceptChallenge,
            rejectChallenge,
            closeMessage,
          ]}
        />
      )}

      <h5 className="title">
        <i className="fa fa-users"></i>&nbsp;OPPONENTS
        <span className="green" onClick={refreshOpponents}>
          <i className={loader ? "fa fa-refresh rotate" : "fa fa-refresh"}></i>
        </span>
      </h5>

      <Opponents players={filtered_opponents} selectHandler={selectOpponent} />

      <Footer signout={true} />

      {opponent_selected && (
        <Challenge
          opponent={opponent_selected}
          confirm={confirmChallenge}
          deselect={deselectOpponent}
        />
      )}
    </Fragment>
  );
}
