import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Workers from "./pages/Workers";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Payments from "./pages/Payments";

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
              element={<Dashboard />}
            />
            <Route
              path="/workers"
              element={<Workers />}
            />
            <Route
              path="/documents"
              element={<Documents />}
            />
            <Route
              path="/payments"
              element={<Payments />}
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
