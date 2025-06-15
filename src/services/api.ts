export interface Worker {
  name: string;
  phoneNumber: string;
  passportNumber: string;
  passportExpiry: Date;
  visaExpiry: Date;
  RMPaid: number;
  status: string;
  transactions: {
    _id: string;
    date: Date;
    amount: number;
    note: string;
  }[];
}

export const getWorkers = async () => {
  const response = await fetch(
    "https://express-famedevres.onrender.com/workers"
  );
  const data = await response.json();
  return data;
};

export const addWorker = async (worker: Worker) => {
  const response = await fetch(
    "https://express-famedevres.onrender.com/worker",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(worker),
    }
  );
  const data = await response.json();
  return data;
};

export const addRMPaid = async (id: string, RMPaid: number, note: string) => {
  const response = await fetch(
    `https://express-famedevres.onrender.com/worker/${id}/updateRMPaid`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ RMPaid, note }),
    }
  );
  const data = await response.json();
  console.log(`PUT ${id}`);
  return data;
};

export const getWorker = async (id: string) => {
  const response = await fetch(
    `https://express-famedevres.onrender.com/worker/${id}`
  );
  const data = await response.json();
  return data;
};

export const deleteWorker = async (id: string) => {
  const response = await fetch(
    `https://express-famedevres.onrender.com/worker/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};
