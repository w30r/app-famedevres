import {
  BanknoteArrowDown,
  Cross,
  FileText,
  Home,
  UsersRound,
} from "lucide-react";
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
    title: "Medical",
    url: "/medical",
    icon: Cross,
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
          {/* <img src="./assets/headerLogo.png" alt="Fame Logo" className="w-24 h-24" /> */}
          <div className="flex flex-col my-4 font-lemon ">
            <h1 className="text-2xl font-bold  text-[#22b9c7] tracking-wider">
              FAME
            </h1>
            <p className="text-[10px] text-white">Development Resources</p>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-white">
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center gap-2 "
                      onClick={() => setOpen(false)}
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
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => setOpen(false)}
                >
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
