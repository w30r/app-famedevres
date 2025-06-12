import { BanknoteArrowDown, FileText, Home, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
];

const items2 = [
  {
    title: "Workers",
    url: "/workers",
    icon: UsersRound,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: BanknoteArrowDown,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
];

export function AppSidebar() {
  const { setOpen } = useSidebar();
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarHeader>
          <h1 className="my-4 text-2xl font-bold text-white">FAME</h1>
          {/* <SidebarTrigger className="absolute top-4 right-4" /> */}
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-white" >
                  <SidebarMenuButton asChild >
                    <Link to={item.url} className="flex items-center gap-2 " onClick={() => setOpen(false)}>
                      <item.icon className="w-4 h-4 text-white" />
                      <span className="text-white">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem key={item.title} onClick={() => setOpen(false)}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center gap-2 text-white"
                    >
                      <item.icon className="w-4 h-4 text-white" />
                      <span className="text-white">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
