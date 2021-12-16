const STATUS_CATEGORY = { 0: "red", 1: "green", 2: "orange" };

function getRank(rank) {
  return Math.min(+rank + 1, 4);
}

export default function Opponents({ players, selectHandler }) {
  return (
    <section id="opponents">
      {players.map((player, index) => {
        return (
          <div
            className="opponent"
            key={player.name}
            onClick={() => selectHandler(player.name)}
          >
            <div className="opponent-profile">
              <img
                src={`${process.env.PUBLIC_URL}/icons/icon-${getRank(
                  index
                )}.png`}
                className="opponent-icon"
                alt="Player Icon"
              />
              <span className="opponent-name">{player.name}</span>
            </div>

            <div
              className={`opponent-status bg-${STATUS_CATEGORY[player.status]}`}
            ></div>
          </div>
        );
      })}
    </section>
  );
}
