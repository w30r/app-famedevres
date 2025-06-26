import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { addWorker, type Worker } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export default function AddWorker() {
  const navigate = useNavigate();
  const { setOpen, open } = useSidebar();
  const [worker, setWorker] = useState<Worker>({
    name: "",
    phoneNumber: "",
    status: "Active",
    passportNumber: "",
    passportExpiry: new Date(),
    visaExpiry: new Date(),
    RMPaid: 0,
    transactions: [],
  });

  useEffect(() => {
    setOpen(!open);
  }, []);

  const handleSubmit = async (worker: Worker) => {
    try {
      await addWorker(worker);
      navigate("/workers");
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-24 flex flex-col">
      <div className="self-start">
        <PageHeader title="Add Worker" />
      </div>
      <form
        onSubmit={() => handleSubmit(worker)}
        className="flex flex-col gap-4 font-normal bg-whixte/20 w-1/2 "
      >
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Name</label>
          <Input
            placeholder="Name"
            value={worker.name}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                name: event.target.value.toUpperCase(),
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">
            Phone Number
          </label>
          <Input
            placeholder="Phone Number"
            value={worker.phoneNumber}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-1/2"
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              setWorker((prev) => ({
                ...prev,
                phoneNumber: value,
              }));
            }}
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">
            Passport Number
          </label>
          <Input
            placeholder="Passport Number"
            value={worker.passportNumber.toUpperCase()}
            type="text"
            className="w-1/2"
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                passportNumber: event.target.value.toUpperCase(),
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">
            Passport Expiry
          </label>
          <Input
            placeholder="Passport Expiry"
            type="date"
            className="w-1/2"
            value={worker.passportExpiry.toISOString().substring(0, 10)}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                passportExpiry: new Date(event.target.value),
              }))
            }
          />
          {/* <DatePicker /> */}
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">
            Visa Expiry
          </label>
          <Input
            placeholder="Visa Expiry"
            className="w-1/2"
            type="date"
            value={worker.visaExpiry.toISOString().substring(0, 10)}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                visaExpiry: new Date(event.target.value),
              }))
            }
          />
          {/* <DatePicker /> */}
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">RM Paid</label>
          <Input
            placeholder="RM Paid"
            type="number"
            className="w-1/2"
            value={worker.RMPaid}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                RMPaid: parseInt(event.target.value, 10),
              }))
            }
          />
        </div>
        {/* <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Status</label>
          <Input
            placeholder="Status"
            value={worker.status}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                status: event.target.value,
              }))
            }
          />
        </div> */}
      </form>
      <div className="flex gap-3">
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="mt-12 text-sm h-auto text-primary place-self-start   "
          onClick={() => handleSubmit(worker)}
        >
          <p className="text-sm">Add Worker</p>
        </Button>
        <Link to="/workers/add/bulk">
          <Button className="mt-12 text-sm h-auto text-primary border-secondary place-self-start   ">
            <p className="text-sm">Bulk Add</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
