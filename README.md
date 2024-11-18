# Secure Dice Game

A command-line implementation of a strategic dice game with cryptographic verification using HMAC-SHA3-256. This game ensures fair play through cryptographic commitments and provides probability analysis for different dice configurations.

## Features

- Secure random number generation using crypto module
- HMAC verification for fair play
- Interactive CLI interface with colored output
- Probability analysis for different dice combinations
- Detailed help system with ASCII-based visualization
- Multiple dice configurations support

## Prerequisites

- Node.js (with ES modules support)
- npm (Node Package Manager)

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Usage

Run the game by providing at least 3 dice configurations as command-line arguments. Each dice configuration should contain 6 comma-separated numbers representing the faces of the dice.

```bash
node main.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
```

### Game Rules

1. The game starts by determining who makes the first move
2. Each player (computer and user) selects a dice from available configurations
3. Players take turns throwing their dice using a secure random number generation process
4. The higher number wins the game
5. All moves can be verified using HMAC keys provided during gameplay

### Commands During Game

- `X` - Exit the game
- `?` - Display help information
- Numbers - Make your selection based on the current context

## Security Features

- Secure random number generation using Node.js crypto module
- HMAC-SHA3-256 for move verification
- Fair play ensured through cryptographic commitments
- Verifiable random number generation process

## Game Components

- `DiceGame.js` - Core game logic
- `DiceGameUI.js` - User interface handling
- `RandomGenerator.js` - Secure random number generation
- `HelpDisplay.js` - Help system and probability calculations
- `DiceParser.js` - Command-line argument parsing
- `Dice.js` - Dice implementation

## Example Dice Configurations

The game supports various dice configurations. Here are some examples:

```bash
# Balanced dice set
node main.js 1,1,6,6,8,8 2,2,7,7,9,9 3,3,5,5,7,7

# Transitive dice set
node main.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
```

## HMAC Verification

To verify any move after the game, you can use the included HMAC test utility:

```bash
node hmacTest.js <number> <key>
```

## Dependencies

- ascii-table: For displaying probability tables
- chalk: For colored console output

## License

ISC

## Author

Luka Gogiashvili
