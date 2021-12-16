import { Fragment, useState, useEffect, useRef, useMemo } from "react";

import Api from "../services/api";

import Header from "./Header";
import Words from "./Words";
import Controls from "./Controls";
import End from "./End";

const DURATION = 20;
const WORD_AUDIO = new Audio(`${process.env.PUBLIC_URL}/sounds/word.ogg`);

export default function Game({ socket, user, room, turn }) {
  const [my_turn, setMyTurn] = useState(turn === user);
  const [word, setWord] = useState("");
  const [user_words, setUserWords] = useState([]);
  const [opponent_words, setOpponentWords] = useState([]);
  const [start_letter, setStartLetter] = useState("");
  const [time, setTime] = useState(DURATION);
  const [error, setError] = useState(null);
  const [winner, setWinner] = useState(null);
  const [fetching_word, setFetchingWord] = useState(false);

  const interval_id = useRef(0);
  const time_ref = useRef(time);
  const word_history = useRef([]);

  useEffect(() => {
    socket.on("word", showWord);
    socket.on("end", endGame);
    startTimer();
    return () => {
      clearInterval(interval_id.current);
      socket.off("word", showWord);
      socket.off("end", endGame);
    };
  }, []);

  useEffect(() => (time_ref.current = time), [time]);

  const my_words = useMemo(() => [...user_words], [user_words]);
  const rival_words = useMemo(() => [...opponent_words], [opponent_words]);

  function startTimer() {
    clearInterval(interval_id.current);

    interval_id.current = setInterval(() => {
      if (time_ref.current === 0) {
        clearInterval(interval_id.current);
        setMyTurn(false);

        socket.emit("end", { room });
      } else {
        setTime((prev) => prev - 1);
      }
    }, 1000);
  }

  function endGame(player) {
    clearInterval(interval_id.current);
    socket.off("word", showWord);
    socket.off("end", endGame);
    setWinner(player);
  }

  function updateWord(new_word) {
    if (my_turn) {
      if (new_word.startsWith(start_letter)) {
        setWord(new_word);
        setError(null);
      } else {
        setError(`Must start with '${start_letter.toUpperCase()}'`);
      }
    }
  }

  async function submitWord() {
    if (word && !fetching_word) {
      if (word_history.current.includes(word)) {
        setError("Word already used");
      } else {
        setFetchingWord(true);
        const {
          error: word_error,
          meaning,
          speech,
        } = await Api.getMeaning(word);
        if (word_error) {
          setError(word_error);
          setFetchingWord(false);
        } else {
          socket.emit("word", {
            room,
            from: user,
            word,
            meaning,
            speech,
          });
          setWord("");
          setMyTurn(false);
          setFetchingWord(false);
        }
      }
    }
  }

  function showWord({ from, word: new_word, meaning, speech, turn }) {
    WORD_AUDIO.play();
    word_history.current.push(new_word);

    if (from === user) {
      setUserWords((prev) => [...prev, { word: new_word, meaning, speech }]);
      setMyTurn(turn === user);
      setTime(DURATION);
    } else {
      setOpponentWords((prev) => [
        ...prev,
        { word: new_word, meaning, speech },
      ]);
      setMyTurn(turn === user);
      setTime(DURATION);
      setStartLetter(new_word.slice(-1));
    }

    startTimer();
  }

  return (
    <Fragment>
      <Header
        user={user}
        opponent={room.replace(user, "").replace("-", "")}
        time={time}
      />
      <Words user_words={my_words} opponent_words={rival_words} />
      {error && (
        <p className="error">
          <i className="fa fa-times-circle"></i>&nbsp;{error}
        </p>
      )}
      <Controls
        word={word}
        turn={my_turn}
        wordHandler={updateWord}
        submitHandler={submitWord}
      />
      {winner && <End outcome={user === winner} />}
    </Fragment>
  );
}
