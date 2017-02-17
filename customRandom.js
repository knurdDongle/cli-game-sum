export default (value) => {
  const randomizer = Math.round((Math.random() - 0.5) * 10);
  return randomizer + value;
};
