import React from "react";
import classnames from "classnames";
import * as worldGenerators from "./WorldGenerator";
import * as playerActions from "./PlayerActions";
import PlayerStats from "./PlayerStats";
require("../Style/Dungeon.scss");

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMap: worldGenerators.genMap(30, 50),
      entities: worldGenerators.genEntities()
    };
  }

  componentWillMount = () => {
    window.addEventListener("keydown", this.handleKeyPress);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyPress);
  };

  attackEnemy = enemy => {
    this.setState(prevState => {
      return {
        ...prevState,
        entities: playerActions.attackEnemy(enemy, prevState)
      };
    });
  };

  engageEntity = coords => {
    let entities = this.state.entities;
    let player = this.state.entities.find(entity => entity.type == "player");
    let encounteredEntity = this.state.entities.find(
      entity => entity.coords[0] == coords[0] && entity.coords[1] == coords[1]
    );
    if (encounteredEntity) {
      switch (encounteredEntity.type) {
        case "loot":
          this.grabLoot(encounteredEntity);
          this.movePlayer(coords);
          break;
        case "enemy":
          this.attackEnemy(encounteredEntity);
          break;
        default:
          console.log("default case of engageEntity, please resolve error");
          break;
      }
    } else this.movePlayer(coords);
  };

  grabLoot = loot => {
    this.setState(prevState => {
      return {
        ...prevState,
        entities: playerActions.grabLoot(loot, prevState)
      };
    });
  };

  handleKeyPress = e => {
    let player = this.state.entities.find(entity => entity.type === "player");
    let currentCoords = player.coords;
    let newCoords;
    if (
      e.code === "ArrowDown" ||
      e.code === "ArrowLeft" ||
      e.code === "ArrowRight" ||
      e.code === "ArrowUp"
    ) {
      switch (e.code) {
        case "ArrowDown":
          newCoords = [
            currentCoords[0],
            currentCoords[1] + 1 == this.state.gameMap[0].cells.length
              ? currentCoords[1]
              : currentCoords[1] + 1
          ];
          break;
        case "ArrowLeft":
          newCoords = [
            currentCoords[0] - 1 < 0 ? currentCoords[0] : currentCoords[0] - 1,
            currentCoords[1]
          ];
          break;
        case "ArrowRight":
          newCoords = [
            currentCoords[0] + 1 == this.state.gameMap[0].cells.length
              ? currentCoords[0]
              : currentCoords[0] + 1,
            currentCoords[1]
          ];
          break;
        case "ArrowUp":
          newCoords = [
            currentCoords[0],
            currentCoords[1] - 1 < 0 ? currentCoords[1] : currentCoords[1] - 1
          ];
          break;
        default:
          break;
      }
      this.engageEntity(newCoords);
    }
  };

  movePlayer = coords => {
    this.setState(prevState => {
      return {
        ...prevState,
        entities: playerActions.movePlayer(coords, prevState)
      };
    });
  };

  resetGame = () => {
    this.setState({
      gameMap: worldGenerators.genMap(),
      entities: worldGenerators.genEntities()
    });
  };

  render() {
    return (
      <div className="dungeon">
        <PlayerStats entities={this.state.entities} />
        {this.state.gameMap.map((row, i) => {
          return (
            <div key={i} className='row' >
              {row.cells.map(cell => {
                let cellContents = this.state.entities.map(entity => {
                  if (
                    entity.coords[1] === i &&
                    entity.coords[0] === cell.cellId
                  ) {
                    let type = entity.type;
                    return type;
                  } else return null;
                });
                let cellDisplay = [
                  "cell",
                  {
                    wall: this.state.gameMap[i].cells[cell.cellId]
                      .contents
                  },
                  cellContents
                ];
                return (
                  <span key={cell.cellId} className={classnames(cellDisplay)} />
                );
              })}
            </div>
          );
        })}
        <h4>
          <button onClick={this.resetGame}>Reset</button>
        </h4>
      </div>
    );
  }
}

export default Map;
