import { columns, type Worker } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/data-table";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

function Workers() {
  const { setOpen } = useSidebar();

  const [data, setData] = useState<Worker[]>([]);
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(
          "https://express-famedevres.onrender.com/workers"
        );
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
          const response = await fetch(
            "https://express-famedevres.onrender.com/workers"
          );
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching workers:", error);
        }
      };
      fetchWorkers();
    }, 10000);
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
