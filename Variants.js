export default class Variants {
  constructor(array, term) {
    this.array = array;
    this.term = term;
  }

  getTrue() {
    return this.array.filter(element => element.isCorrect)[0].value;
  }

  setTrue(newValue) {
    const term = this.term;
    const trueValue = {
      value: newValue,
      isCorrect: true,
    };
    const falseValues = this.array.filter(element => !element.isCorrect);
    return new Variants(falseValues.concat(trueValue), term);
  }

  setFalse(value1, value2) {
    const term = this.term;
    const falseValue1 = {
      value: value1,
      isCorrect: false,
    };
    const falseValue2 = {
      value: value2,
      isCorrect: false,
    };
    const trueValue = this.array.filter(element => element.isCorrect);
    return new Variants(trueValue.concat(falseValue1, falseValue2), term); // TODO
  }

  getValues() {
    return this.array.map(element => element.value);
  }

  getTerm() {
    return this.term;
  }
}
