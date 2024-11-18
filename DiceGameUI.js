import readline from "readline";
import HelpDisplay from "./HelpDisplay.js";

class DiceGameUI {
  constructor(diceConfigurations) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.helpDisplay = new HelpDisplay(diceConfigurations);
  }

  async question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => resolve(answer));
    });
  }

  displayOptions(options) {
    options.forEach((option) => console.log(`${option} - ${option}`));
    console.log("X - exit");
    console.log("? - help");
  }

  displayDiceOptions(diceList, excludeDice = null) {
    console.log("Choose your dice:");
    diceList.forEach((dice, index) => {
      if (dice !== excludeDice) {
        console.log(`${index} - ${dice.toString().slice(1, -1)}`);
      }
    });
    console.log("X - exit");
    console.log("? - help");
  }

  async getPlayerNumber(max) {
    while (true) {
      const input = await this.question("Your selection: ");
      if (input === "X") this.ui.exit();
      if (input === "?") {
        await this.handleHelp("throw");
      }

      const number = parseInt(input);

      if (!isNaN(number) && number >= 0 && number < max) {
        return number;
      }
      console.log("Invalid choice. Try again.");
    }
  }

  displayMessage(message) {
    console.log(message);
  }

  displayHMAC(hmac) {
    console.log(`(HMAC=${hmac}).`);
  }

  close() {
    this.rl.close();
  }

  async handleHelp(context) {
    switch (context) {
      case "firstMove":
        this.displayMessage(
          "This is a simple guessing game to determine who goes first."
        );
        break;
      case "diceSelection":
        this.helpDisplay.displayHelp();
        await this.question("\nPress Enter to continue...");
        break;
      case "throw":
        this.helpDisplay.displayHelp();
        await this.question("\nPress Enter to continue...");
        break;
    }
  }

  exit() {
    process.exit(0);
  }
}

export default DiceGameUI;
