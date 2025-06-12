import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Worker = {
  id: number;
  name: string;
  photo: string | null;
  nationality?: string;
  passportNumber: string;
  permitVisaNumber: string;
  permitVisaExpiry: string;
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
      const nationality = row.getValue("nationality") as string | null;
      return (
        <div className="flex items-center gap-2">
          {nationality === "Bangladeshi" && nationality && (
            <img
              alt="Bangladesh"
              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/BD.svg"
              className="w-6 h-auto rounded-xs"
            />
          )}
          <div className="font-medium">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "passportNumber",
    header: "Passport Number",
  },
  {
    accessorKey: "permitVisaNumber",
    header: "Permit/Visa Number",
  },
  {
    accessorKey: "permitVisaExpiry",
    header: "Permit/Visa Expiry",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "siteProject",
    header: "Site/Project",
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
