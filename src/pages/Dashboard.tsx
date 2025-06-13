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

export default function Dashboard() {
  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col">
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-start">
        <Card className="hover:scale-102 duration-150 transition-all ease-in-and-out">
          <CardHeader>
            <CardTitle>WORKERS</CardTitle>
            <CardDescription className="font-normal text-sm">
              // The number of workers
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>100 out of 350</p>
            <Progress value={30} />
          </CardContent>
        </Card>
        <Card className="hover:scale-102 duration-150 transition-all ease-in-and-out">
          <CardHeader>
            <CardTitle>NEXT VISA EXPIRY</CardTitle>
            <CardDescription className="font-normal text-sm">
              // The next closest visa expiry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>20 JUNE 2025</p>
            <p className="font-normal text-sm text-white/50">(7 hari selepas)</p>
          </CardContent>
          <CardFooter className="font-normal text-sm">
            <p>John Wick</p> </CardFooter>
        </Card>
        <Card className="col-spanx-2 hover:scale-102 duration-150 transition-all ease-in-and-out">
          <CardHeader>
            <CardTitle>WORKERS</CardTitle>
            <CardDescription className="font-normal text-sm">
              // The number of workers
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>350 out of 350</p>
            <Progress value={100
            } />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
