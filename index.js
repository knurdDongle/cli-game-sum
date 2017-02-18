import Variants from './Variants';
import UserData from './UserData';
import customRandom from './customRandom';
import endGame from './endGame';
import { getAnswer } from './cli';

const sumOperation = (value) => {
  const result = customRandom(value);
  const newValue = result.value;
  const newTerm = result.term;
  return {
    value: newValue,
    term: newTerm,
  };
};

const calcNewVars = (vars) => {
  const trueValue = vars.getTrue();
  const newTrueObj = sumOperation(trueValue);
  const falseValue1 = sumOperation(trueValue).value;
  const falseValue2 = sumOperation(trueValue).value;
  const newVars = new Variants([], newTrueObj.term);
  return newVars.setTrue(newTrueObj.value).setFalse(falseValue1, falseValue2);
};

const checkAnswer = (answer, vars) => {
  const correctValue = vars.getTrue();
  console.log(typeof answer, typeof correctValue);
  return answer === correctValue;
};

const newRound = (turn, vars, userData) => {
  if (turn === 0) {
    return endGame(userData.getScore());
  }
  const answer = getAnswer(vars, userData);
  console.log(answer); // eslint-disable-line

  let newUserData;
  if (checkAnswer(answer, vars)) {
    console.log('Correct!');
    const score = userData.getScore();
    newUserData = userData.setScore(score + answer).setAnswer(answer);
  } else {
    console.log('Wrong!');
    newUserData = userData.setAnswer(answer);
  }

  console.log(`Your score is ${newUserData.getScore()}`); // eslint-disable-line

  const newVars = calcNewVars(vars);
  return newRound(turn - 1, newVars, newUserData);
};

const newGame = (numberOfRounds, startVars) =>
  newRound(numberOfRounds, startVars, new UserData(0, 0));

newGame(10, new Variants([
  { value: 5, isCorrect: true },
  { value: 6, isCorrect: false },
  { value: 4, isCorrect: false },
], 5));
