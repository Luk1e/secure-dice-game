class Dice {
  constructor(faces) {
    if (faces.length !== 6) {
      throw new Error("Dice must have exactly 6 faces");
    }
    this.faces = [...faces];
  }

  getFace(index) {
    return this.faces[index];
  }

  toString() {
    return `[${this.faces.join(",")}]`;
  }
}

export default Dice;
