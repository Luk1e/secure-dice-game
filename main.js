import DiceParser from "./DiceParser.js";
import DiceGame from "./DiceGame.js";
import DiceGameUI from "./DiceGameUI.js";

async function main() {
  try {
    const args = process.argv.slice(2);

    if (args.length < 3) {
      console.log("Error: At least 3 dice configurations are required.");
      console.log("Example: node main.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
      process.exit(1);
    }

    const diceList = DiceParser.parseDiceConfigurations(args);
    const ui = new DiceGameUI(diceList);
    const game = new DiceGame(diceList, ui);

    await game.play();
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
}

main();
