"use client";

import Button from "./ui/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  path: string;
};

const menu: Menu[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Take Test", icon: ClipboardList, path: "/take-test" },
  { label: "History", icon: History, path: "/history" },
  { label: "Revise", icon: CalendarClock, path: "/upcoming-test" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-48 bg-foreground pl-3 py-6 flex flex-col rounded-tr-xl rounded-br-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-8 mb-24 text-xl pb-12 border-b border-text/50">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
        <span className="text-xl font-extrabold text-primary">
          Retentia
        </span>
      </div>

      <nav className="flex flex-col gap-3">
        {menu.map(({ label, icon: Icon, path }) => {
          const isActive = pathname === path;


          return (
            <Link key={label} href={path}>
              <Button
                variant="sidebar_btn"
                className={`${isActive ? "bg-primary-light text-primary" : "hover:bg-primary-light"
                  }`}
              >
                <Icon size={20} />
                <span className="text-lg">{label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-12 pt-10 border-t border-text/50">
        <Button>
          <Image
            src="/logo.png"
            alt="user"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="px-5 text-sm">Name</span>
        </Button>
      </div>
    </aside>
  );
}
