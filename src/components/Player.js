export default function Player({ who, name }) {
  const icon_name = who.charAt(0);

  return (
    <div className="player-card flex col">
      <img
        src={`${process.env.PUBLIC_URL}/icons/icon-${icon_name}.png`}
        alt="Player icon"
        className="player-icon"
      />

      <h6 className="player-name">{name}</h6>
    </div>
  );
}
