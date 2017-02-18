import readlineSync from 'readline-sync';

export const getAnswer = (vars, userData) => {
  const values = vars.getValues();
  const lastAnswer = userData.getAnswer();
  const term = vars.getTerm();
  const operation = term > 0 ? '+' : '-';
  const answerString = readlineSync.question(`${lastAnswer} ${operation} ${Math.abs(term)} = ? \n
  ${values} `);
  return Number(answerString, 10);
};
