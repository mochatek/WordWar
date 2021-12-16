import { useRef, useEffect, memo } from "react";

const Words = memo(function ({ user_words, opponent_words }) {
  const words_section = useRef(null);

  useEffect(() => {
    words_section.current.scrollTop = words_section.current.scrollHeight;
  }, [user_words, opponent_words]);

  function playSpeech(event) {
    event.preventDefault();
    event.target.parentElement.parentElement.querySelector("audio")?.play();
  }

  return (
    <section id="words" className="flex" ref={words_section}>
      <div className="flex col user-words">
        {user_words.map(({ word, meaning, speech }, index) => (
          <details className="bg-green" key={`u-${index}`}>
            <summary>
              {word}
              {speech && <i className="fa fa-volume-up" onClick={playSpeech} />}
            </summary>
            <i>: {meaning}</i>
            {speech && <audio controls src={speech} />}
          </details>
        ))}
      </div>

      <div className="flex col opponent-words">
        {opponent_words.map(({ word, meaning, speech }, index) => (
          <details className="bg-blue" key={`o-${index}`}>
            <summary>
              {word}
              {speech && <i className="fa fa-volume-up" onClick={playSpeech} />}
            </summary>
            <i>: {meaning}</i>
            {speech && <audio controls src={speech} />}
          </details>
        ))}
      </div>
    </section>
  );
});

export default Words;
