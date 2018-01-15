export const attackEnemy = (enemy, state) => {
  let health,
    player = state.entities.find(entity => entity.type === "player"),
    playerHealth = player.health - Math.ceil(Math.random() * enemy.attack);
  if (playerHealth <= 0) {
    alert("You lost you fucking loser!");
  } else {
    let entityMap = state.entities.map(entity => {
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
    return entityMap;
  }
};

export const grabLoot = (loot, state) => {
  let benefit = loot.benefit,
    entityMap,
    playerAttribute;
  switch (loot.contains) {
    case "health":
      entityMap = state.entities.map(entity => {
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
      entityMap = state.entities.map(entity => {
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
  return entityMap;
};

export const movePlayer = (coords, state) => {
  let entityMap = state.entities.map(entity => {
    if (entity.type === "player") {
      return { ...entity, coords };
    } else return entity;
  });
  return entityMap;
};
