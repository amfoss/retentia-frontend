import Button from "./ui/Button";
import Image from "next/image";
import {
  LayoutDashboard,
  ClipboardList,
  History,
  CalendarClock,
  LucideIcon,
} from "lucide-react";


type Menu = {
  label: string;
  icon: LucideIcon;
};

const menu: Menu[] = [
  { label: "Dashboard", icon:LayoutDashboard},
  { label: "Take Test", icon: ClipboardList },
  { label: "Test History", icon: History },
  { label: "Upcoming Test", icon: CalendarClock },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-80 bg-foreground px-6 py-12 flex flex-col rounded-tr-xl rounded-br-xl">
 
      <div className="flex items-center gap-7 px-8 mb-24 text-xl pb-12 border-b border-text/50 -mx-6">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
       <span className="text-4xl font-extrabold text-primary">Retentia</span>
      </div>

      <nav className="flex flex-col gap-7">
        {menu.map(({ label, icon: Icon }) => (
        <Button
            key={label} variant="sidebar_btn">
          <div className="flex justify-center ">
            <Icon size={30} className="group-hover:text-primary transition "/>
          </div>
          <span className=" group-hover:text-primary transition">{label}</span>
        </Button>
        ))}
      </nav>

     <div className="mt-auto px-12 pt-10 border-t border-text/50 -mx-6">
        <Button>
            <Image src="/logo.png" alt="user" width={36} height={36} className="rounded-full"/>
            <span className="px-5 text-2xl">Name</span>
        </Button>
      </div>
    </aside>
  );
}