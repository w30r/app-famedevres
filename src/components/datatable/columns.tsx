import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Worker = {
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
        <div className="flex items-center gap-2 w-fit mr-8">
          <img
            alt="Bangladesh"
            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/BD.svg"
            className="w-6 h-auto rounded-xs"
          />
          <div className="font-medium">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "passportNumber",
    header: "Passport Number",
  },
  {
    accessorKey: "RMPaid",
    header: "Amount Paid (RM)",
    cell: ({ row }) => {
      return (
        <>
          <Progress
            className="mt-2"
            value={((row.getValue("RMPaid") as number) / 5000) * 100}
          />
          <div className="flex justify-between">
            <p>
              RM{(row.getValue("RMPaid") as number).toLocaleString()} / RM5,000
            </p>
            <p></p>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "permitVisaExpiry",
    header: "Expiry",
    cell: ({ row }) => {
      const raw = row.getValue("permitVisaExpiry");
      const permitVisaExpiry = raw ? new Date(raw as string) : null;
      return (
        <div className="flex items-center gap-2 w-fit mr-8">
          <div className="font-medium">
            {permitVisaExpiry && !isNaN(permitVisaExpiry.getTime())
              ? new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(permitVisaExpiry)
              : "-"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "daysUntilPermitVisaExpiry",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="bg-white"
        >
          Days until Expiry
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw = row.getValue("permitVisaExpiry");
      const permitVisaExpiry = raw ? new Date(raw as string) : null;
      const now = new Date();
      const msPerDay = 1000 * 60 * 60 * 24;
      let diff = 0;
      if (permitVisaExpiry && !isNaN(permitVisaExpiry.getTime())) {
        diff = Math.ceil(
          (permitVisaExpiry.getTime() - now.getTime()) / msPerDay
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
                  ? `${years} years`
                  : months > 0
                  ? `${months} months`
                  : days > 0
                  ? `${days} days`
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as
        | "Active"
        | "Transferred"
        | "Left";

      const statusVariantMap: Record<
        Worker["status"],
        "default" | "outline" | "destructive"
      > = {
        Active: "default",
        Transferred: "outline",
        Left: "destructive",
      };

      return (
        <Badge
          className="text-right font-medium"
          variant={statusVariantMap[status]}
        >
          {status}
        </Badge>
      );
    },
  },
];
