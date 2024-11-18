import RandomGenerator from "./RandomGenerator.js";

class DiceGame {
  constructor(diceList, ui) {
    this.diceList = diceList;
    this.ui = ui;
    this.randomGenerator = new RandomGenerator();
  }

  async play() {
    try {
      this.ui.displayMessage("Let's determine who makes the first move.");
      const isComputerFirst = await this.determineFirstMove();

      let computerDice, playerDice;
      if (isComputerFirst) {
        computerDice = this.selectComputerDice();
        this.ui.displayMessage(
          `I make the first move and choose the ${computerDice} dice.`
        );
        playerDice = await this.selectPlayerDice(computerDice);
      } else {
        playerDice = await this.selectPlayerDice();
        computerDice = this.selectComputerDice(playerDice);
        this.ui.displayMessage(`I choose the ${computerDice} dice.`);
      }

      const result = await this.performThrows(
        computerDice,
        playerDice,
        isComputerFirst
      );
      this.announceWinner(result);
    } finally {
      this.ui.close();
    }
  }

  async determineFirstMove() {
    const key = this.randomGenerator.generateSecureKey();
    const computerChoice = this.randomGenerator.generateSecureInt(0, 1);
    const hmac = this.randomGenerator.calculateHMAC(
      key,
      computerChoice.toString()
    );

    this.ui.displayMessage("I selected a random value in the range 0..1");
    this.ui.displayHMAC(hmac);
    this.ui.displayMessage("Try to guess my selection.");
    this.ui.displayOptions(["0", "1"]);

    while (true) {
      const input = await this.ui.question("Your selection: ");

      if (input === "X") this.ui.exit();
      if (input === "?") {
        await this.ui.handleHelp("firstMove");
        continue;
      }

      const playerChoice = parseInt(input);
      if (isNaN(playerChoice) || playerChoice < 0 || playerChoice > 1) {
        this.ui.displayMessage("Please enter 0 or 1.");
        continue;
      }

      this.ui.displayMessage(
        `My selection: ${computerChoice} (KEY=${key
          .toString("hex")
          .toUpperCase()}).`
      );
      return !(computerChoice === playerChoice);
    }
  }

  selectComputerDice(excludeDice = null) {
    const availableDice = this.diceList.filter((d) => d !== excludeDice);
    return availableDice[
      this.randomGenerator.generateSecureInt(0, availableDice.length - 1)
    ];
  }

  async selectPlayerDice(excludeDice = null) {
    this.ui.displayDiceOptions(this.diceList, excludeDice);

    while (true) {
      const input = await this.ui.question("Your selection: ");
      if (input === "X") this.ui.exit();
      if (input === "?") {
        await this.ui.handleHelp("diceSelection");
        continue;
      }

      const choice = parseInt(input);
      if (
        !isNaN(choice) &&
        choice >= 0 &&
        choice < this.diceList.length &&
        this.diceList[choice] !== excludeDice
      ) {
        this.ui.displayMessage(`You choose the ${this.diceList[choice]} dice.`);
        return this.diceList[choice];
      }
      this.ui.displayMessage("Invalid choice. Try again.");
    }
  }

  async performSingleThrow(dice, isComputer) {
    const key = this.randomGenerator.generateSecureKey();
    const computerNumber = this.randomGenerator.generateSecureInt(0, 5);
    const hmac = this.randomGenerator.calculateHMAC(
      key,
      computerNumber.toString()
    );

    this.ui.displayMessage(
      `It's time for ${isComputer ? "my" : "your"} throw.`
    );
    this.ui.displayMessage("I selected a random value in the range 0..5");
    this.ui.displayHMAC(hmac);
    this.ui.displayMessage("Add your number modulo 6.");

    this.ui.displayOptions(["0", "1", "2", "3", "4", "5"]);

    const playerNumber = await this.ui.getPlayerNumber(6);

    this.ui.displayMessage(
      `My number is ${computerNumber} (KEY=${key
        .toString("hex")
        .toUpperCase()}).`
    );

    const throwIndex = (computerNumber + playerNumber) % 6;
    const roll = dice.getFace(throwIndex);

    this.ui.displayMessage(
      `The result is ${computerNumber} + ${playerNumber} = ${throwIndex} (mod 6)`
    );
    this.ui.displayMessage(`${isComputer ? "My" : "Your"} throw is ${roll}.`);

    return roll;
  }

  async performThrows(computerDice, playerDice, isComputerFirst) {
    let firstRoll, secondRoll;

    if (isComputerFirst) {
      firstRoll = await this.performSingleThrow(computerDice, true);
      secondRoll = await this.performSingleThrow(playerDice, false);
      return { computerRoll: firstRoll, playerRoll: secondRoll };
    } else {
      firstRoll = await this.performSingleThrow(playerDice, false);
      secondRoll = await this.performSingleThrow(computerDice, true);
      return { playerRoll: firstRoll, computerRoll: secondRoll };
    }
  }

  announceWinner({ computerRoll, playerRoll }) {
    if (computerRoll > playerRoll) {
      this.ui.displayMessage(`I win! (${computerRoll} > ${playerRoll})`);
    } else if (playerRoll > computerRoll) {
      this.ui.displayMessage(`You win! (${playerRoll} > ${computerRoll})`);
    } else {
      this.ui.displayMessage(`It's a tie! (${playerRoll} = ${computerRoll})`);
    }
  }
}

export default DiceGame;
