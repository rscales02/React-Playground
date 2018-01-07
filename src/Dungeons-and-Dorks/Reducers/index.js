import { combineReducers } from "redux";

const map = (state = {map: genMap(30, 50)}, action) => {
  return state
};

const player = (state = {player: true}, action) => {
  return state
};

const genMap = (height, width) => {
  const map = []
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(j)
    }
    map.push(row)
  }
  return map
}

const combinedReducers = combineReducers({
  map,
  player
});

export default combinedReducers;
