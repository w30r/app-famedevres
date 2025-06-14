import { useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { useEffect } from "react";
import { getWorker } from "@/services/api";
import { useState } from "react";
import type { Worker } from "@/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function WorkerDetails() {
  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const worker = await getWorker(id as string);
        setWorker(worker);
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

  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col ">
      <PageHeader title="Worker Details" />

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
          <div className="bg-whixte/20 p-8 rounded-lg flex flex-col items-center text-sm font-normal text-white border-1 border-white/20 gap-4">
            <PageHeader title="Transactions" />
            <div className="w-1/2">
              <Progress value={((worker?.RMPaid as number) / 5000) * 100} />
            </div>
            <div className="w-1/2">
              <p className="text-center">RM {worker?.RMPaid}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
