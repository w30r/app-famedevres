import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Workers from "./pages/Workers";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Payments from "./pages/Payments";
import AddWorker from "./pages/AddWorker";
import WorkerDetails from "./pages/WorkerDetails";
import Medical from "./pages/Medical";
// import BulkAddWorker from "./pages/BulkAddWorker";

function App() {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen min-w-screen bg-background tracking-wide">
        <AppSidebar />
        <div className="fixed pt-3 pl-3 xbg-white/20">
          <SidebarTrigger className="focus-visible:border-none focus-visible:outline-none " />
        </div>
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/workers/:id" element={<WorkerDetails />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/medical" element={<Medical />} />
            <Route path="/workers/add" element={<AddWorker />} />
            {/* <Route path="/workers/add/bulk" element={<BulkAddWorker />} /> */}
            <Route
              path="*"
              element={<h1 className="text-2xl font-bold ">404 Not Found</h1>}
            />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
