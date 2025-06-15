import { useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { useEffect } from "react";
import { getWorker, updateRMPaid } from "@/services/api";
import { useState } from "react";
import type { Worker } from "@/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WorkerDetails() {
  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [RMPaid, setRMPaid] = useState<number>(0);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const worker = await getWorker(id as string);
        setWorker(worker);
        setRMPaid(worker.RMPaid);
      } catch (error) {
        setError("Error fetching worker");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchWorker();
    }
  }, [id]);

  const handleUpdateRMPaid = async (id: string, RMPaid: number) => {
    await updateRMPaid(id, RMPaid);
    const data = await getWorker(id);
    setWorker(data);
    setRMPaid(data.RMPaid);
  };

  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col ">
      <PageHeader title="Worker Details" />

      <div className="lg:px-36">
        {loading ? (
          <Alert>
            <AlertTitle>Loading...</AlertTitle>
            <AlertDescription>Fetching worker details...</AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive" className="font-normal">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-whixte/20 p-8 rounded-lg flex flex-col items-center text-sm font-normal text-white border-1 border-white/20">
              <div className="mb-12 flex flex-col items-center">
                <Avatar className="w-24 h-24 ">
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarFallback>{worker?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="text-2xl font-bold">{worker?.name}</p>
                <p className="text-xs">{worker?.passportNumber}</p>
              </div>
              <div className=" bg-whxite/20 w-full text-sm">
                <div className="flex items-center gap-2">
                  <label>Phone Number:</label>
                  <p>
                    {worker?.phoneNumber.slice(0, 3)}-
                    {worker?.phoneNumber.slice(3)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label>Permit Visa Expiry:</label>
                  <p>{worker?.permitVisaExpiry}</p>
                </div>
              </div>
            </div>
            <div className="bg-whixte/20 p-8 rounded-lg flex flex-col items-center text-md font-normal text-white border-1 border-white/20 gap-4">
              <PageHeader title="Transactions" />
              <div className="w-1/2 flex flex-col items-center gap-2 mb-8">
                <Progress
                  value={((worker?.RMPaid as number) / 4300) * 100}
                  className="w-full h-4"
                />
                <div className="flex items-center justify-between gap-2 text-sm bg-wxhite/20 w-full">
                  <p className="text-start text-primary/50">
                    RM {(worker?.RMPaid as number).toLocaleString()}
                  </p>
                  <p className="text-primary/50 ">/RM 4,300</p>
                  {/* <p className="text-end">
                  {Number(((worker?.RMPaid as number) / 4300) * 100).toFixed(2)}
                  %
                </p> */}
                </div>
              </div>
              <div className="flex items-center flex-col gap-4">
                <Input
                  type="number"
                  className="w-full "
                  value={RMPaid}
                  onChange={(e) => setRMPaid(Number(e.target.value))}
                />
                <Button
                  className="text-primary"
                  onClick={() => handleUpdateRMPaid(id as string, RMPaid)}
                >
                  Update
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleUpdateRMPaid(id as string, RMPaid + 50)}
                >
                  +50
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleUpdateRMPaid(id as string, RMPaid + 100)}
                >
                  +100
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleUpdateRMPaid(id as string, RMPaid + 200)}
                >
                  +200
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleUpdateRMPaid(id as string, RMPaid + 500)}
                >
                  +500
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="col-span-2"
                  onClick={() =>
                    handleUpdateRMPaid(id as string, RMPaid + 1000)
                  }
                >
                  +1000
                </Button>
              </div>
            </div>
            <div className="bg-whixte/20 p-8 rounded-lg flex flex-col items-center text-md font-normal text-white border-1 border-white/20 gap-4">
              <PageHeader title="Timeline" />
              <div className="w-full flex flex-col items-center gap-2"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
