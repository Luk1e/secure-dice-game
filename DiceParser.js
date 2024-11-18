import Dice from "./Dice.js";

class DiceParser {
  static parseDiceConfigurations(args) {
    return args.map((arg) => {
      const values = arg.split(",");
      if (values.length !== 6) {
        throw new Error(
          `Each dice must have exactly 6 values. Invalid configuration: ${arg}`
        );
      }

      const faces = values.map((value) => {
        const num = parseInt(value.trim());
        if (isNaN(num)) {
          throw new Error(
            `Invalid number format in dice configuration: ${value}`
          );
        }
        return num;
      });

      return new Dice(faces);
    });
  }
}

export default DiceParser;
