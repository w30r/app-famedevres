import { columns, type Worker } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/data-table";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { deleteWorker, getWorkers } from "@/services/api";
import type { ColumnDef } from "@tanstack/react-table";
import { Trash, Info, Plus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Workers() {
  const { setOpen } = useSidebar();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    await deleteWorker(id);
    const data = await getWorkers();
    setData(data);
  };

  const navigate = useNavigate();

  const columnz: ColumnDef<Worker>[] = [
    ...columns,
    {
      id: "actions",
      header: " ",
      cell: ({ row }) => {
        const worker = row.original;
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/workers/${worker._id}`)}>
              <Info className="h-4 w-4 text-blue-500/50" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(worker._id)}>
              <Trash className="h-4 w-4 text-red-500/50" />
            </Button>
          </div>
        //   <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(worker._id)}
        //     >
        //       Copy ID
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem onClick={() => navigate(`/workers/${worker._id}`)}>View worker</DropdownMenuItem>
        //     <DropdownMenuItem onClick={() => handleDelete(worker._id)}>Delete</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
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

  const handleRefresh = async () => {
    // setLoading(true);
    const data = await getWorkers();
    setData(data);
    // setLoading(false);
  };

  return (
    <div className="text-xl font-bold bxg-white/20 h-full w-full p-12 flex flex-col">
      <PageHeader title="Workers" />
      <div className="flex items-center mb-3">
        <Button
          className="mr-2 w-fit text-2xs text-white text-xs self-end"
          variant={"secondary"}
          onClick={() => {
            window.location.href = "/workers/add";
            setOpen(false);
          }}
        >
          <Plus />
        </Button>
        <Button
          className="w-fit text-2xs text-white text-xs self-end"
          variant={"secondary"}
          onClick={handleRefresh}
        >
          <RefreshCw />
        </Button>
      </div>
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
