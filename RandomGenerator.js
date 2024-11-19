import crypto from "crypto";

class RandomGenerator {
  generateSecureKey() {
    return crypto.randomBytes(32);
  }

  generateSecureInt(min, max) {
    if (min >= max) {
      throw new Error("max must be greater than min");
    }
    return crypto.randomInt(min, max + 1);
  }

  calculateHMAC(key, message) {
    const hmac = crypto.createHmac("sha3-256", key);
    hmac.update(message);
    return hmac.digest("hex").toUpperCase();
  }
}

export default RandomGenerator;
