import { columns, type Worker } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/data-table";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { deleteWorker, getWorkers } from "@/services/api";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

function Workers() {
  const { setOpen } = useSidebar();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    await deleteWorker(id);
    const data = await getWorkers();
    setData(data);
  };

  const columnz: ColumnDef<Worker>[] = [
    ...columns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const worker = row.original;
        return (
          <Button onClick={() => handleDelete(worker._id)}>
            <Trash className="h-4 w-4 text-red-500" />
            <p className="text-red-500">Delete</p>
          </Button>
        );
      },
    },
  ];

  const [data, setData] = useState<Worker[]>([]);
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkers();
        setData(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
    setLoading(false);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchWorkers = async () => {
        try {
          const data = await getWorkers();
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columnz} data={data} />
        )}
      </div>
    </div>
  );
}

export default Workers;
