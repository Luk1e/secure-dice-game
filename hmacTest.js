import RandomGenerator from "./RandomGenerator.js";

const randomGenerator = new RandomGenerator();

if (process.argv.length !== 4) {
  console.log("Usage: node hmac.js <num> <key>");
  process.exit(1);
}

const num = process.argv[2];
const keyInput = process.argv[3];

const key = Buffer.from(keyInput, "hex");
const hmac = randomGenerator.calculateHMAC(key, num);

console.log(`Generated HMAC: ${hmac}`);
