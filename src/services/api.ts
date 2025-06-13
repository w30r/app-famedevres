export interface Worker {
  id?: number;
  name: string;
  phoneNumber: string;
  status: string;
  passportNumber: string;
  permitVisaExpiry: string;
  RMPaid: number;
}

export const getWorkers = async () => {
  const response = await fetch("https://express-famedevres.onrender.com/workers");
  const data = await response.json();
  return data;
};

export const addWorker = async (worker: Worker) => {
  const response = await fetch("https://express-famedevres.onrender.com/worker", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(worker),
  });
  const data = await response.json();
  return data;
};
