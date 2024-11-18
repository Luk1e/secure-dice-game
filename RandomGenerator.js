import crypto from "crypto";

class RandomGenerator {
  generateSecureKey() {
    return crypto.randomBytes(32);
  }

  generateSecureInt(min, max) {
    if (min >= max) {
      throw new Error("max must be greater than min");
    }

    const range = max - min + 1;
    const bitsNeeded = Math.ceil(Math.log2(range));
    const bytesNeeded = Math.ceil(bitsNeeded / 8);
    const mask = (1 << bitsNeeded) - 1;

    while (true) {
      const bytes = crypto.randomBytes(bytesNeeded);
      let num = 0;
      for (let i = 0; i < bytesNeeded; i++) {
        num = (num << 8) | bytes[i];
      }

      num = num & mask;
      if (num < range) {
        return num + min;
      }
    }
  }

  calculateHMAC(key, message) {
    const hmac = crypto.createHmac("sha3-256", key);
    hmac.update(message);
    return hmac.digest("hex").toUpperCase();
  }
}

export default RandomGenerator;
