import readlineSync from 'readline-sync';

// export const getUserAnswer = (vars, userData) => {
//   const values = vars.getValues();
//   const lastAnswer = userData.getAnswer();
//   const term = vars.getTerm();
//
//   const answerString = readlineSync.question(`${lastAnswer} + ${term} = ? \n
//   ${values} \n`);
//   return Number(answerString, 10);
// };
const randomOrder = (array) => {
  const newArray = array.slice();
  return newArray.sort(() => (Math.random() * 2) - 1);
};

export const getUserAnswer = (vars, userData) => {
  const values = vars.getValues();
  const newValues = randomOrder(values);
  const lastAnswer = userData.getAnswer();
  const term = vars.getTerm();

  console.log(`\n${lastAnswer} + ${term} = ? \n`); // eslint-disable-line
  const index = readlineSync.keyInSelect(newValues);
  return Number(newValues[index], 10);
};
