export default class Variants {
  constructor(array) {
    this.array = array;
  }

  getTrue() {
    return this.array.filter(element => element.isCorrect).map(element => element[0]);
  }
}
