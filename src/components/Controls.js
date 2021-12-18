export default function Controls({ word, turn, submitHandler, wordHandler }) {
  function submit(event) {
    event.preventDefault();
    submitHandler();
  }

  function setWord(event) {
    event.preventDefault();
    const new_word = event.target.value
      .trim()
      .toLocaleLowerCase()
      .replace(/[^a-z]/gi, "");
    wordHandler(new_word);
  }

  return (
    <form id="controls" className="flex" onSubmit={submit}>
      <input
        type="text"
        className="word-text"
        placeholder="Type your word.."
        value={word}
        onChange={setWord}
        style={{ backgroundColor: turn ? "lightgreen" : "white" }}
        autoFocus={turn}
      />
      <button className="bg-yellow" type="submit" disabled={!turn}>
        <i className="fa fa-send"></i>
      </button>
    </form>
  );
}
