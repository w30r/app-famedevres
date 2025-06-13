import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/PageHeader";

export default function AddWorker() {
  const { setOpen, open } = useSidebar();
  const [worker, setWorker] = useState({
    id: 0,
    name: "",
    photo: null,
    nationality: "",
    passportNumber: "",
    permitVisaNumber: "",
    permitVisaExpiry: "",
    phoneNumber: "",
    siteProject: "",
    status: "",
  });

  useEffect(() => {
    setOpen(!open);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(worker);
  };

  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col">
      <div className="self-start">
        <PageHeader title="Add Worker" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-normal">
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Name</label>
          <Input
            placeholder="Name"
            value={worker.name}
            onChange={(event) =>
              setWorker((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Nationality</label>
          <Input
            placeholder="Nationality"
            value={worker.nationality}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                nationality: event.target.value,
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Passport Number</label>
          <Input
            placeholder="Passport Number"
            value={worker.passportNumber}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                passportNumber: event.target.value,
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Permit/Visa Number</label>
          <Input
            placeholder="Permit/Visa Number"
            value={worker.permitVisaNumber}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                permitVisaNumber: event.target.value,
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Permit/Visa Expiry</label>
          <Input
            placeholder="Permit/Visa Expiry"
            type="date"
            value={worker.permitVisaExpiry}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                permitVisaExpiry: event.target.value,
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Phone Number</label>
          <Input
            placeholder="Phone Number"
            value={worker.phoneNumber}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                phoneNumber: event.target.value,
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
          <label className="text-sm font-bold place-self-start">Site/Project</label>
          <Input
            placeholder="Site/Project"
            value={worker.siteProject}
            onChange={(event) =>
              setWorker((prev) => ({
                ...prev,
                siteProject: event.target.value,
              }))
            }
          />
        </div>
        <div className="bg-whixte/20 flex flex-col gap-2">
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
        </div>
      </form>
      <div>
        <button type="submit" className="btn btn-primary mt-12">
          Add Worker
        </button>
      </div>
    </div>
  );
}
