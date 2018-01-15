import React from "react";

const PlayerStats = ({ entities }) => {
  return (
    <div>
      <span className="stats">
        Health:{" "}
        {entities.find(entity => entity.type === "player").health}
      </span>
      <span className="stats">
        Attack Power:{" "}
        {entities.find(entity => entity.type === "player").attack}
      </span>
      <span className="stats">
        XP: {entities.find(entity => entity.type === "player").xp}
      </span>
    </div>
  );
};

export default PlayerStats;
