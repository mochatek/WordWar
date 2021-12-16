import Player from "./Player";

export default function Header({ user, opponent, time }) {
  return (
    <section id="header" className="flex">
      <Player who="user" name={user} />
      <h1 className="timer">{time}</h1>
      <Player who="opponent" name={opponent} />
    </section>
  );
}
