import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Workers from "./pages/Workers";

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-screen bg-background">
        <AppSidebar />
        <div className="pt-3 pl-3 xbg-white/20">
          <SidebarTrigger className="focus-visible:border-none focus-visible:outline-none "/>
        </div>
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/dashboard"
              element={<h1 className="text-2xl font-bold ">Dashboard</h1>}
            />
            <Route
              path="/workers"
              element={<Workers />}
            />
            <Route
              path="/documents"
              element={<h1 className="text-2xl font-bold ">Documents</h1>}
            />
            <Route
              path="/payments"
              element={<h1 className="text-2xl font-bold ">Payments</h1>}
            />
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
