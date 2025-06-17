import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { getWorkers, type Worker } from "@/services/api";
import CountUp from "@/components/CountUp";

export default function Dashboard() {
  const [worker, setWorker] = useState<Worker[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loadingTotalkPaid, setLoadingTotalPaid] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await getWorkers();
        setWorker(response);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorker();
  }, []);

  useEffect(() => {
    const calcTotalPaid = () => {
      let totalPaid = 0;
      try {
        worker.forEach((worker) => {
          totalPaid += worker?.RMPaid;
        });
      } catch (error) {
        console.error("Error calculating total paid:", error);
      } finally {
        setTotalPaid(totalPaid);
      }
    };
    setLoadingTotalPaid(false);
    calcTotalPaid();
  }, [worker]);

  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col">
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-start">
        <Card className="text-sm font-normal">
          <CardHeader>
            <p className="text-lg">Workers</p>
          </CardHeader>
          <CardContent className="-mt-4">
            <CountUp
              className="count-up-text text-5xl font-bold "
              from={0}
              to={worker.length}
              separator=","
              direction="up"
            />
          </CardContent>
        </Card>
        <Card className="text-sm font-normal">
          <CardHeader>
            <p className="text-lg">Total Paid</p>
          </CardHeader>
          <CardContent className="-mt-4">
            {!loadingTotalkPaid ? (
              // <h1 className="font-bold">
              //   RM
              //   {totalPaid.toLocaleString(undefined, {
              //     minimumFractionDigits: 2,
              //     maximumFractionDigits: 2,
              //   })}
              // </h1>
              <div className="flex">
                <p className="font-bold text-5xl">RM</p>
                <CountUp
                  from={0}
                  to={totalPaid}
                  separator=","
                  direction="up"
                  duration={0.5}
                  className="count-up-text font-bold text-5xl"
                />
              </div>
            ) : (
              <h1 className="font-bold">RM0.00</h1>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
