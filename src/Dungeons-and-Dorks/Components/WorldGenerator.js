export const genEntities = () => {
  const entities = [
    {
      type: 'enemy',
      coords: [5, 5],
      health: 10,
      attack: 4
    },
    {
      type: 'player',
      coords: [1, 1],
      health: 100,
      attack: 5,
      xp: 0
    },
    {
      type: 'loot',
      contains: 'health',
      benefit: 5,
      coords: [3, 3]
    },
    {
      type: 'loot',
      contains: 'attack power',
      benefit: 4,
      coords: [2, 2]
    }
  ];
  return entities;
};

export const genMap = () => {
  let height = 30,
    width = 50;
  const mapMatrix = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push({ cellId: j, contents: 'wall' });
    }
    mapMatrix.push(row);
  }
  let featuredMatrix = insertFeatures(mapMatrix);
  return featuredMatrix;
};

const insertFeatures = (mapMatrix, coords = [15, 15], recursions = 5) => {
  const nextFeature =
    mapFeatures[Math.floor(Math.random() * mapFeatures.length)];

  let newMatrix = insertNewFeature(mapMatrix, coords, nextFeature)

  if (recursions >= 0) {
    let startCoordsOptions = [];
    for (let i = 0; i < newMatrix.length; i++) {
      let row = newMatrix[i];
      for (let j = 0; j < row.cells.length; j++) {
        const cell = row.cells[j];
        if (cell) {
          if (
            emptyBelow([cell.cellId, i], newMatrix) ||
            emptyLeft([cell.cellId, i], newMatrix) ||
            emptyRight([cell.cellId, i], newMatrix) ||
            emptyTop([cell.cellId, i], newMatrix)
          ) {
            startCoordsOptions.push([cell.cellId, i]);
          }
        }
      }
    }
    let nextStartCoords =
      startCoordsOptions[Math.floor(Math.random() * startCoordsOptions.length)];
    return insertFeatures(newMatrix, nextStartCoords, --recursions);
  } else {
    return newMatrix;
  }
};

const emptyBelow = (coords, matrix) => {
  let x = coords[0];
  let y = coords[1];
  let top = y + 1 >= matrix.length ? y : y + 1;
  if (
    matrix[top].cells[x].contents === null &&
    matrix[y].cells[x].contents === 'wall'
  ) {
    return true;
  } else return false;
};

const emptyLeft = (coords, matrix) => {
  let x = coords[0];
  let y = coords[1];
  let left = x - 1 <= 0 ? x : x - 1;
  if (
    matrix[y].cells[left].contents === null &&
    matrix[y].cells[x].contents === 'wall'
  ) {
    return true;
  } else return false;
};

const emptyRight = (coords, matrix) => {
  let x = coords[0];
  let y = coords[1];
  let right = x + 1 >= matrix[0].cells.length ? x : x + 1;
  if (
    matrix[y].cells[right].contents === null &&
    matrix[y].cells[x].contents === 'wall'
  ) {
    return true;
  } else return false;
};

const emptyTop = (coords, matrix) => {
  let x = coords[0];
  let y = coords[1];
  let top = y - 1 <= 0 ? y : y - 1;
  if (
    matrix[top].cells[x].contents === null &&
    matrix[y].cells[x].contents === 'wall'
  ) {
    return true;
  } else return false;
};

const insertNewFeature = (matrix, startCoords, nextFeature) => {
  const endCoords = findEndCoords(matrix, startCoords, endCoords)
  if (endCoords) {
    let newMatrix = matrix.map((row, i) => {
      if (i >= startCoords[1] && i <= endCoords[1]) {
        let cells = row.cells.map(cell => {
          if (
            cell.cellId >= startCoords[0] &&
            cell.cellId <= endCoords[0] &&
            cell.contents === 'wall'
          ) {
            return { ...cell, contents: null };
          } else return cell;
        });
        return { ...row, cells: cells };
      } else return row;
    });
    return newMatrix
  } else return matrix
}

const findEndCoords = (matrix, startCoords, nextFeature) => {
  let endCoords = [startCoords[0] + nextFeature.dimensions[0], startCoords[1] + nextFeature[1]]

  if (endCoords[0] < 0 || endCoords[0] >= matrix[0].cells.length) {
    
  }
}

const mapFeatures = [
  {
    type: 'room',
    dimensions: [5, 5]
  },
  {
    type: 'hallway',
    dimensions: [10, 4]
  },
  {
    type: 'large-room',
    dimensions: [8, 12]
  }
];
