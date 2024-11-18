import AsciiTable from "ascii-table";
import chalk from "chalk";

class HelpDisplay {
  constructor(diceConfigurations) {
    this.diceConfigs = diceConfigurations;
  }

  calculateWinProbability(dice1, dice2) {
    const values1 = dice1.split(",").map(Number);
    const values2 = dice2.split(",").map(Number);

    const wins = values1.reduce(
      (total, v1) => total + values2.filter((v2) => v1 > v2).length,
      0
    );

    return Number((wins / (values1.length * values2.length)).toFixed(4));
  }

  displayHelp() {
    console.clear();
    console.log(chalk.cyan("\nDice Game - Help Information"));
    console.log(chalk.cyan("============================\n"));

    this.displayGameRules();
    this.displayProbabilityTable();

    console.log(chalk.gray("\nPress Enter to continue..."));
  }

  displayGameRules() {
    console.log(chalk.yellow("Game Rules:"));
    console.log("1. Computer generates a move and shows you an HMAC");
    console.log("2. Choose your dice configuration from the available options");
    console.log("3. Computer reveals its move and the secret key");
    console.log("4. Winner is determined by comparing dice combinations");
    console.log("5. You can verify the HMAC using the provided key\n");
  }

  displayProbabilityTable() {
    const table = new AsciiTable();
    table.setTitle("Win Probability Table");

    const headers = [
      "User dice v",
      ...this.diceConfigs.map((dice) => dice.toString().slice(1, -1)),
    ];
    table.setHeading(...headers);

    this.diceConfigs.forEach((rowDice) => {
      const row = [rowDice.toString().slice(1, -1)];

      this.diceConfigs.forEach((colDice) => {
        if (rowDice === colDice) {
          row.push("- (0.3333)".padStart(10));
        } else {
          const prob = this.calculateWinProbability(
            rowDice.toString().slice(1, -1),
            colDice.toString().slice(1, -1)
          );
          row.push(prob.toFixed(4).padStart(10));
        }
      });

      table.addRow(row);
    });

    table.setAlign(0, AsciiTable.LEFT);
    for (let i = 1; i <= this.diceConfigs.length; i++) {
      table.setAlign(i, AsciiTable.RIGHT);
    }

    console.log(table.toString());
    console.log(chalk.cyan("\nHow to read the table:"));
    console.log(chalk.cyan("============================\n"));
    console.log("- Rows show your selected dice");
    console.log("- Columns show computer's dice");
    console.log("- Values show your probability of winning");
    console.log("- Diagonal shows same-dice matchups (always 0.3333)\n");
  }
}

export default HelpDisplay;
