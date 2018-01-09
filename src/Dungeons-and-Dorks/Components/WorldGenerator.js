export const genEntities = () => {
  const entities = [
    {
      type: "enemy",
      coords: [5, 5],
      health: 10,
      attack: 4
    },
    {
      type: "player",
      coords: [1, 1],
      health: 100,
      attack: 5
    },
    {
      type: "loot",
      contains: "health",
      benefit: 5,
      coords: [3, 3]
    },
    {
      type: "loot",
      contains: "attack power",
      benefit: 4,
      coords: [2, 2]
    }
  ];
  return entities;
};

export const genMap = (height, width) => {
  const game = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
        row.push({ cellId: j, contents: "wall" });
      } else {
        row.push({ cellId: j, contents: null });
      }
    }
    game.push({ rowId: i, cells: row });
  }
  return game;
};
