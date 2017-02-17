import Variants from './Variants';
import customRandom from './customRandom';
import endGame from './endGame';

const sumOperation = value => value + customRandom(value);

const calcNewVars = (variants) => {
  const trueVar = variants.getTrue();
  const trueResult = sumOperation(trueVar.value);
  const falseResult1 = sumOperation(trueVar.value);
  const falseResult2 = sumOperation(trueVar.value);

  const trueValue = {
    value: trueResult,
    isCorrect: true,
  };

  const falseValue1 = {
    value: falseResult1,
    isCorrect: false,
  };

  const falseValue2 = {
    value: falseResult2,
    isCorrect: false,
  };
  return new Variants([trueValue, falseValue1, falseValue2]);
};

const newRound = (turn, vars) => {
  console.log(turn, vars); // eslint-disable-line
  if (turn === 0) {
    return endGame;
  }
  const newVars = calcNewVars(vars);
  return newRound(turn - 1, newVars);
};

const newGame = (numberOfRounds, startVars) => {
  const score = 123;
  return newRound(numberOfRounds, startVars)(score);
};

newGame(10, new Variants(
  { value: 5, isCorrect: true },
  { value: 6, isCorrect: false },
  { value: 4, isCorrect: false },
));
