export default (value) => {
  const randomizer = Math.round((Math.random() - 0.5) * 2);
  const newValue = value + randomizer;
  return {
    value: newValue,
    term: randomizer,
  };
};
