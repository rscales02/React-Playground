import React from "react";
import classnames from "classnames";
import * as worldGenerators from './WorldGenerator'
import * as playerActions from './PlayerActions'
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
    let health,
      player = this.state.entities.find(entity => entity.type === "player"),
      playerHealth = player.health - Math.ceil(Math.random() * enemy.attack);
    if (playerHealth <= 0) {
      alert("You lost you fucking loser!");
      this.resetGame;
    } else {
      this.setState(prevState => {
        let entityMap = prevState.entities.map(entity => {
          if (entity.type === "player") {
            return { ...entity, health: playerHealth };
          } else if (
            entity.coords[0] === enemy.coords[0] &&
            entity.coords[1] === enemy.coords[1]
          ) {
            health = entity.health - Math.floor(Math.random() * player.attack);
            if (health <= 0) {
              return { ...entity, health, coords: [-1, -1] };
            } else return { ...entity, health };
          } else return entity;
        });
        return {...prevState, entities: entityMap}
      });
    }
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
    let benefit = loot.benefit,
      entityMap,
      playerAttribute;
    this.setState(prevState => {
      switch (loot.contains) {
        case "health":
          entityMap = prevState.entities.map(entity => {
            if (entity.type === "player") {
              playerAttribute = entity.health;
              return { ...entity, health: playerAttribute + benefit };
            } else if (
              entity.coords[0] === loot.coords[0] &&
              entity.coords[1] === loot.coords[1]
            ) {
              return { ...entity, coords: [-1, -1] };
            } else return entity;
          });
          break;
        case "attack power":
          entityMap = prevState.entities.map(entity => {
            if (entity.type === "player") {
              playerAttribute = entity.attack;
              return { ...entity, attack: playerAttribute + benefit };
            } else if (
              entity.coords[0] === loot.coords[0] &&
              entity.coords[1] === loot.coords[1]
            ) {
              return { ...entity, coords: [-1, -1] };
            } else return entity;
          });
          break;
        default:
          break;
      }
      return { ...prevState, entities: entityMap };
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
      let entityMap = prevState.entities.map(entity => {
        if (entity.type === "player") {
          return { ...entity, coords };
        } else return entity;
      });
      return {
        ...prevState,
        entities: entityMap
      };
    });
  };

  resetGame = () => {
    this.setState({
      gameMap: this.genMap(30, 50),
      entities: this.genEntities()
    });
  };

  render() {
    return (
      <div className="dungeon">
        <h2>Player Stats</h2>
        {this.state.gameMap.map(row => {
          return (
            <div key={row.rowId}>
              {row.cells.map(cell => {
                let cellContents = this.state.entities.map(entity => {
                  if (
                    entity.coords[1] === row.rowId &&
                    entity.coords[0] === cell.cellId
                  ) {
                    let type = entity.type;
                    return type;
                  } else return null;
                });
                let cellDisplay = [
                  "cell",
                  {
                    wall: this.state.gameMap[row.rowId].cells[cell.cellId]
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
