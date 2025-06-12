import { columns, type Worker } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/data-table";

const data: Worker[] = [
  {
    id: 1,
    name: "Md. Karim",
    photo: null,
    nationality: "Bangladeshi",
    passportNumber: "123456789",
    permitVisaNumber: "X123456",
    permitVisaExpiry: "31-Dec-2025",
    phoneNumber: "01711-111111",
    siteProject: "Project A",
    status: "Active",
  },
  {
    id: 2,
    name: "Md. Rahim",
    photo: null,
    nationality: "Bangladeshi",
    passportNumber: "987654321",
    permitVisaNumber: "Y987654",
    permitVisaExpiry: "30-Jun-2024",
    phoneNumber: "01999-999999",
    siteProject: "Project B",
    status: "Transferred",
  },
  {
    id: 3,
    name: "Md. Jamal",
    photo: null,
    nationality: "Bangladeshi",
    passportNumber: "555555555",
    permitVisaNumber: "Z555555",
    permitVisaExpiry: "31-Dec-2026",
    phoneNumber: "01555-555555",
    siteProject: "Project C",
    status: "Left",
  },
  {
    id: 4,
    name: "Md. Ali",
    photo: null,
    nationality: "Bangladeshi",
    passportNumber: "888888888",
    permitVisaNumber: "A888888",
    permitVisaExpiry: "31-Dec-2027",
    phoneNumber: "01888-888888",
    siteProject: "Project D",
    status: "Active",
  },
  {
    id: 5,
    name: "Md. Ahmed",
    photo: null,
    nationality: "Bangladeshi",
    passportNumber: "999999999",
    permitVisaNumber: "B999999",
    permitVisaExpiry: "31-Dec-2028",
    phoneNumber: "01999-999999",
    siteProject: "Project E",
    status: "Transferred",
  },
];

function Workers() {
  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col">
      <div className="self-start mb-6">
        <h1>Workers</h1>
      </div>

      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Workers;
