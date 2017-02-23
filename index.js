import Variants from './Variants';
import UserData from './UserData';

import endGame from './endGame';
import { getUserAnswer } from './cli';

const customRandom = (value) => {
  const randomizer = Math.round(Math.random() * 10);
  const newValue = value + randomizer;
  return {
    value: newValue,
    term: randomizer,
  };
};

const calcNewVars = (vars, userData) => {
  const lastValue = userData.getAnswer();
  const trueObj = customRandom(lastValue);
  const newTerm = trueObj.term;
  const trueValue = trueObj.value;
  // console.log(`-------------------
  //   last value is ${lastValue}
  //   new value is ${trueValue}
  //   new term is ${newTerm}
  //   ------------------`);
  const falseValue1 = customRandom(lastValue).value;
  const falseValue2 = customRandom(lastValue).value;
  const newVars = new Variants([], newTerm);
  const newVars1 = newVars.setTrue(trueValue);
  const newVars2 = newVars1.setFalse(falseValue1, falseValue2);
  // console.log(`-------------------
  //   false value 1 is ${falseValue1}
  //   false value 2 is ${falseValue2}
  //   new vars is ${newVars}
  //   new vars1 is ${newVars1}
  //   new vars2 is ${newVars2}
  //   ------------------`);

  return newVars2;
};

const checkAnswer = (answer, vars) => {
  const correctValue = vars.getTrue();
  return answer === correctValue;
};

const newRound = (turn, vars, userData) => {
  if (turn === 0) {
    return endGame(userData.getScore());
  }
  console.log('\nNew round:') // eslint-disable-line
  const answer = getUserAnswer(vars, userData);
  if (isNaN(answer)) {
    return endGame(userData.getScore());
  }

  let newUserData;
  if (checkAnswer(answer, vars)) {
    console.log(`Your answer is ${answer}. Correct!`); // eslint-disable-line
    const score = userData.getScore();
    newUserData = userData.setScore(score + answer).setAnswer(answer);
  } else {
    console.log(`Your answer is ${answer}. Wrong!`); // eslint-disable-line
    newUserData = userData.setAnswer(answer);
  }

  console.log(`---------------------------
    Your score is ${newUserData.getScore()}
---------------------------`); // eslint-disable-line

  const newVars = calcNewVars(vars, newUserData);
  return newRound(turn - 1, newVars, newUserData);
};

const newGame = (numberOfRounds, startVars) =>
  newRound(numberOfRounds, startVars, new UserData(0, 0));

newGame(10, new Variants([
  { value: 5, isCorrect: true },
  { value: 6, isCorrect: false },
  { value: 4, isCorrect: false },
], 5));
