import { columns, type Worker } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/data-table";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

// const data: Worker[] = [
//   {
//     id: 1,
//     name: "Md. Kari",
//     photo: null,
//     nationality: "Bangladeshi",
//     passportNumber: "123456789",
//     permitVisaNumber: "X123456",
//     permitVisaExpiry: "31-Dec-2025",
//     phoneNumber: "01711-111111",
//     siteProject: "Project A",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Md. Alim",
//     photo: null,
//     nationality: "Bangladeshi",
//     passportNumber: "987654321",
//     permitVisaNumber: "Y987654",
//     permitVisaExpiry: "30-Jun-2024",
//     phoneNumber: "01999-999999",
//     siteProject: "Project B",
//     status: "Transferred",
//   },
//   {
//     id: 3,
//     name: "Jamal",
//     photo: null,
//     nationality: "Bangladesho",
//     passportNumber: "555555555",
//     permitVisaNumber: "Z555555",
//     permitVisaExpiry: "31-Dec-2026",
//     phoneNumber: "01555-555555",
//     siteProject: "Project C",
//     status: "Left",
//   },
//   {
//     id: 4,
//     name: "Md. Ali",
//     photo: null,
//     nationality: "Bangladeshi",
//     passportNumber: "888888888",
//     permitVisaNumber: "A888888",
//     permitVisaExpiry: "31-Dec-2027",
//     phoneNumber: "01888-888888",
//     siteProject: "Project D",
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Md. Ahmed",
//     photo: null,
//     nationality: "gili",
//     passportNumber: "999999999",
//     permitVisaNumber: "B999999",
//     permitVisaExpiry: "31-Dec-2028",
//     phoneNumber: "01999-999999",
//     siteProject: "Project E",
//     status: "Transferred",
//   },
// ];



function Workers() {
  const { setOpen } = useSidebar();

  const [data, setData] = useState<Worker[]>([]);
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("https://express-famedevres.onrender.com/workers");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchWorkers = async () => {
        try {
          const response = await fetch("https://express-famedevres.onrender.com/workers");
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching workers:", error);
        }
      };
      fetchWorkers();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col">
      <PageHeader title="Workers" />
      <Button
        className="mb-3 w-fit text-2xs text-white text-xs self-end"
        variant={"secondary"}
        onClick={() => {
          window.location.href = "/workers/add";
          setOpen(false);
        }}
      >
        <Plus />
      </Button>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Workers;
