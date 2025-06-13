import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

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
    header: "Name",
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
