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
import { getWorkers } from "@/services/api";

export default function Dashboard() {
  const [worker, setWorker] = useState([]);

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

  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col">
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-start">
        <Card className="hover:scale-102 duration-150 transition-all ease-in-and-out">
          <CardHeader>
            <div>
              <h3 className="-mb-2">NEXT VISA EXPIRY</h3>
              <p className="font-normal text-sm text-primary/50">
                // The next closest visa expiry
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p>20 JUNE 2025</p>
            <p className="font-normal text-sm text-white/50">
              (7 hari selepas)
            </p>
          </CardContent>
          <CardFooter className="font-normal text-sm">
            <p>John Wick</p>{" "}
          </CardFooter>
        </Card>
        <Card className="col-spanx-2 hover:scale-102 duration-150 transition-all ease-in-and-out">
          <CardHeader>
            <h3>WORKERS</h3>
            <p className="font-normal text-sm">// The number of workers</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>350 out of 350</p>
            <Progress value={100} />
          </CardContent>
        </Card>
        <Card className="hover:scale-102 duration-150 transition-all ease-in-and-out">
          <CardHeader>
            <h3>WORKERS</h3>
            <p className="font-normal text-sm">// The number of workers</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-4xl font-bold">{worker.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
