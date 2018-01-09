export const attackEnemy = enemy => {
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

export const engageEntity = coords => {
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


export const grabLoot = loot => {
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

export const movePlayer = coords => {
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