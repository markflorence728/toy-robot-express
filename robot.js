class ToyBot {
  position;
  direction;

  constructor() {
    this.position = {};
    this.direction = null;
  }

  getNextPosition() {
    const {x, y} = this.position;
    switch (this.direction) {
      case "NORTH":
        return { x, y: y + 1 };
      case "EAST":
        return { x: x + 1, y };
      case "SOUTH":
        return { x, y: y - 1 };
      case "WEST":
        return { x: x - 1, y };
      default:
        return this.position;
    }
  }

  isPointValid(point) {
    return (
      point.x >= 0 &&
      point.x <= 4 &&
      point.y >= 0 &&
      point.y <= 4
    );
  }

  isDirectionValid(direction) {
    return ["NORTH", "EAST", "SOUTH", "WEST"].includes(direction);
  }

  place(x, y, direction) {
    if (this.isDirectionValid(direction) && this.isPointValid({x, y})) {
      this.position= {x, y};
      if (direction) {
        this.direction = direction;
      }
    }
  }

  move() {
    const nextPosition = this.getNextPosition();
    if (this.isPointValid(nextPosition)) {
      this.position = nextPosition;
    }
  }  

  turnLeft() {
    if (this.direction) {
      switch (this.direction) {
        case "NORTH":
          this.direction = "WEST";
          break;
        case "EAST":
          this.direction = "NORTH";
          break;
        case "SOUTH":
          this.direction = "EAST";
          break;
        case "WEST":
          this.direction = "SOUTH";
          break;
        default:
          break;
      }
    }
  }

  turnRight() {
    if (this.direction) {
      switch (this.direction) {
        case "NORTH":
          this.direction = "EAST";
          break;
        case "EAST":
          this.direction = "SOUTH";
          break;
        case "SOUTH":
          this.direction = "WEST";
          break;
        case "WEST":
          this.direction = "NORTH";
          break;
        default:
          break;
      }
    }
  }

  reportPosition() {
    return this.direction
      ? `Position: (${this.position.x}, ${this.position.y}), Facing: ${this.direction}`
      : "Toy bot has not been placed yet.";
  }
}

class Command {
  command;
  args;

  constructor(commandString) {
    const [command, args] = commandString.trim().toUpperCase().split(" ");
    this.command = command;
    this.args = args?.split(",");
  }

  execute(toyBot) {
    switch (this.command) {
      case "PLACE":
        const [x, y, direction] = this.args ?? [];

        if (x && y) {
          toyBot.place(parseInt(x), parseInt(y), direction);
        }
        break;
      case "MOVE":
        toyBot.move();
        break;
      case "LEFT":
        toyBot.turnLeft();
        break;
      case "RIGHT":
        toyBot.turnRight();
        break;
      case "REPORT":
        return toyBot.reportPosition();
      default:
        return "Invalid command. Try again.";
    }
  }
}

module.exports = {
  ToyBot,
  Command,
}