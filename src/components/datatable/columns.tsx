import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Worker = {
  _id: string;
  id: number;
  name: string;
  photo: string | null;
  passportNumber: string;
  permitVisaNumber: string;
  permitVisaExpiry: Date | null;
  phoneNumber: string;
  siteProject: string;
  status: "Active" | "Transferred" | "Left";
};

export const columns: ColumnDef<Worker>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="bg-white"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="flex items-center ml-4 gap-2 w-fit mr-8">
          {/* <img
            alt="Bangladesh"
            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/BD.svg"
            className="w-6 h-auto rounded-xs"
          /> */}
          <div className="font-medium">{name}</div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "phoneNumber",
  //   header: "Phone Number",
  //   cell: ({ row }) => {
  //     const phoneNumber = row.getValue("phoneNumber") as string;
  //     return <p>{phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3)}</p>;
  //   },
  // },
  {
    accessorKey: "passportNumber",
    header: "Passport Number",
  },
  {
    accessorKey: "passportExpiry",
    header: "Ppt. Expiry Date",
    cell: ({ row }) => {
      const raw = row.getValue("passportExpiry");
      const passportExpiry = raw ? new Date(raw as string) : null;
      return (
        <div className="flex items-center gap-2 w-fit mr-8">
          <div className="font-medium">
            {passportExpiry && !isNaN(passportExpiry.getTime())
              ? new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(passportExpiry)
              : "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "passportExpiry",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="bg-white"
        >
          Ppt Exp In
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw = row.getValue("passportExpiry");
      const passportExpiry = raw ? new Date(raw as string) : null;
      const now = new Date();
      const msPerDay = 1000 * 60 * 60 * 24;
      let diff = 0;
      if (passportExpiry && !isNaN(passportExpiry.getTime())) {
        diff = Math.ceil(
          (passportExpiry.getTime() - now.getTime()) / msPerDay
        );
      }
      const years = Math.floor(diff / 365);
      const months = Math.floor((diff % 365) / 30);
      const days = diff % 30;
      return (
        <div className="flex items-center gap-2 w-fit mr-8">
          <div className="font-medium">
            {diff > 0 ? (
              <>
                {years > 0
                  ? `${years} year(s)`
                  : months > 0
                  ? `${months} month(s)`
                  : days > 0
                  ? `${days} day(s)`
                  : ""}
              </>
            ) : (
              <Badge className="text-right font-medium" variant="destructive">
                Overdue
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "visaExpiry",
    header: "Visa Expiry Date",
    cell: ({ row }) => {
      const raw = row.getValue("visaExpiry");
      const visaExpiry = raw ? new Date(raw as string) : null;
      return (
        <div className="flex items-center gap-2 w-fit mr-8">
          <div className="font-medium">
            {visaExpiry && !isNaN(visaExpiry.getTime())
              ? new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(visaExpiry)
              : "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "visaExpiry",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="bg-white"
        >
          Visa Exp In
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw = row.getValue("visaExpiry");
      const visaExpiry = raw ? new Date(raw as string) : null;
      const now = new Date();
      const msPerDay = 1000 * 60 * 60 * 24;
      let diff = 0;
      if (visaExpiry && !isNaN(visaExpiry.getTime())) {
        diff = Math.ceil(
          (visaExpiry.getTime() - now.getTime()) / msPerDay
        );
      }
      const years = Math.floor(diff / 365);
      const months = Math.floor((diff % 365) / 30);
      const days = diff % 30;
      return (
        <div className="flex items-center gap-2 w-fit mr-8">
          <div className="font-medium">
            {diff > 0 ? (
              <>
                {years > 0
                  ? `${years} year(s)`
                  : months > 0
                  ? `${months} month(s)`
                  : days > 0
                  ? `${days} day(s)`
                  : ""}
              </>
            ) : (
              <Badge className="text-right font-medium" variant="destructive">
                Overdue
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "RMPaid",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="bg-white"
        >
          Amount Paid (RM)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const RMPaid = row.getValue("RMPaid") as number;
      const progressValue = ((RMPaid / 4300) * 100).toFixed(2);
      return (
        <div className="flex flex-col text-xs">
          <Progress
            className=""
            value={Number(progressValue)}
          />
          <div className="flex justify-between">
            <p>
              RM{RMPaid.toLocaleString()} <span className="text-xs text-primary/50 italic">/ RM4,300</span>
            </p>
            <p>{Number(progressValue).toFixed(2)}%</p>
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const status = row.getValue("status") as
  //       | "Active"
  //       | "Transferred"
  //       | "Left";

  //     const statusVariantMap: Record<
  //       Worker["status"],
  //       "default" | "outline" | "destructive"
  //     > = {
  //       Active: "default",
  //       Transferred: "outline",
  //       Left: "destructive",
  //     };

  //     return (
  //       <Badge
  //         className="text-right font-medium"
  //         variant={statusVariantMap[status]}
  //       >
  //         {status}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const worker = row.original;
  //     return (
  //       <div className="font-medium">
  //         <Button
  //           variant="default"
  //           onClick={() => {
  //             deleteWorker(worker._id);
  //           }}
  //         >
  //           {/* <Trash className="text-red-500 " /> */}
  //           <p className="text-red-500">{worker._id}</p>
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
