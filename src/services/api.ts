export const getWorkers = async () => {
  const response = await fetch("https://express-famedevres.onrender.com/workers");
  const data = await response.json();
  return data;
};
