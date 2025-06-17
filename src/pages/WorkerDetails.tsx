import { useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { useEffect } from "react";
import { getWorker, addRMPaid } from "@/services/api";
import { useState } from "react";
import type { Worker } from "@/services/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Phone, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WorkerDetails() {
  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [RMPaid, setRMPaid] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const worker = await getWorker(id as string);

        // Convert date fields to Date objects
        worker.passportExpiry = worker.passportExpiry
          ? new Date(worker.passportExpiry)
          : null;
        worker.visaExpiry = worker.visaExpiry
          ? new Date(worker.visaExpiry)
          : null;

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

  const handleUpdateRMPaid = async (
    id: string,
    RMPaid: number,
    note: string
  ) => {
    await addRMPaid(id, RMPaid, note);
    const data = await getWorker(id);

    // Convert date fields to Date objects
    data.passportExpiry = data.passportExpiry
      ? new Date(data.passportExpiry)
      : null;
    data.visaExpiry = data.visaExpiry ? new Date(data.visaExpiry) : null;

    setWorker(data);
    setRMPaid(0);
    setNote("");
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
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="*INFO* bg-whixte/20 p-8 rounded-lg flex flex-col justify-center items-center text-sm font-normal text-white border-1 border-white/20">
                <div className="mb-12 flex flex-col items-center">
                  <Avatar className="w-24 h-24 ">
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>{worker?.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <p className="text-2xl font-bold">{worker?.name}</p>
                  <p className="text-xs">{worker?.passportNumber}</p>
                </div>
                <div className=" bg-whxite/20 w-full text-sm">
                  <div className="flex items-center justify-start gap-3 ">
                    <Phone className="h-4 w-4" />
                    <p>
                      {worker?.phoneNumber ? (
                        <>
                          {worker?.phoneNumber.slice(0, 3)}-
                          {worker?.phoneNumber.slice(3)}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4" />
                    <p>
                      (Ppt){" "}
                      {worker?.passportExpiry
                        ? new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(worker.passportExpiry)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4" />
                    <p>
                      (Visa){" "}
                      {worker?.visaExpiry
                        ? new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(worker.visaExpiry)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="*TRANSACTIONS* bg-whixte/20 p-8 rounded-lg flex flex-col items-center text-md font-normal text-white border-1 border-white/20 gap-4">
                <PageHeader title="Transactions" />
                <div className="w-1/2 flex flex-col items-center gap-2 mb-8">
                  <Progress
                    value={((worker?.RMPaid as number) / 4300) * 100}
                    className="w-full h-4"
                  />
                  <div className="flex items-center justify-between gap-2 text-sm bg-wxhite/20 w-full">
                    <p className="text-start text-primary/50">
                      RM {worker?.RMPaid.toLocaleString()}
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
                    placeholder="RM"
                    onChange={(e) => setRMPaid(Number(e.target.value))}
                  />
                  <Input
                    className="w-full"
                    placeholder="Note"
                    value={note}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleUpdateRMPaid(id as string, RMPaid, note)
                    }
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <Button
                    className="text-primary"
                    onClick={() =>
                      handleUpdateRMPaid(id as string, RMPaid, note)
                    }
                  >
                    Add
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleUpdateRMPaid(id as string, 50, "Quick pay RM50.00")
                    }
                  >
                    +50
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleUpdateRMPaid(
                        id as string,
                        100,
                        "Quick pay RM100.00"
                      )
                    }
                  >
                    +100
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleUpdateRMPaid(
                        id as string,
                        200,
                        "Quick pay RM200.00"
                      )
                    }
                  >
                    +200
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleUpdateRMPaid(
                        id as string,
                        500,
                        "Quick pay RM500.00"
                      )
                    }
                  >
                    {" "}
                    +500
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="col-span-2"
                    onClick={() =>
                      handleUpdateRMPaid(
                        id as string,
                        1000,
                        "Quick pay RM1000.00"
                      )
                    }
                  >
                    +1000
                  </Button>
                </div>
              </div>
            </div>
            <div className="*TIMELINE* bg-whixte/20 p-8 rounded-lg flex flex-col items-center text-md font-normal text-white border-1 border-white/20 gap-4">
              <PageHeader title="Timeline" />
              <div className="relative flex flex-col gap-2 w-full md:w-1/3 w-1/2 pl-6">
                {/* vertical line */}
                <div className="absolute left-2 top-0 bottom-0 w-px bg-white/20" />

                {worker?.transactions
                  ?.slice()
                  .reverse()
                  .map((transaction) => (
                    <div
                      key={transaction._id}
                      className="relative flex flex-col items-start bg-red-50x0/50 p-2 border border-white/20 rounded-lg"
                    >
                      {/* dot */}
                      <div className="absolute -left-[25px] top-[35px] w-3 h-3 rounded-full bg-white border border-primary" />

                      <p className="text-xs text-primary/50">
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                          timeZone: "Asia/Kuala_Lumpur",
                        }).format(
                          new Date(transaction.date as unknown as string)
                        )}
                      </p>
                      <p className="text-lg">
                        RM
                        {(transaction.amount as number).toLocaleString(
                          "en-GB",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                      <p className="text-xs text-primary/50">
                        {"//  " + (transaction.note ? transaction.note : "-")}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
