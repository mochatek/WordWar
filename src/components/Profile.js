import { memo } from "react";

function getRank(rank) {
  return Math.min(+rank + 1, 4);
}

const Profile = memo(function ({ name, matches, wins, points, rank }) {
  return (
    <section id="profile">
      <div className="flex col">
        <h5 className="player-name">
          <span>#{getRank(rank)}</span> {name}
        </h5>
        <img
          src={`${process.env.PUBLIC_URL}/icons/icon-${getRank(rank)}.png`}
          className="player-icon"
          alt="Player Icon"
        />
      </div>

      <div className="table">
        <div className="cell bg-red bold">M</div>
        <div className="cell bg-green bold">W</div>
        <div className="cell bg-yellow bold">
          <i className="fa fa-trophy"></i>
        </div>
        <div className="cell circle-badge">{matches}</div>
        <div className="cell circle-badge">{wins}</div>
        <div className="cell circle-badge">{points}</div>
      </div>
    </section>
  );
});

export default Profile;
