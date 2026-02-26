"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Layout, 
  Building2, 
  ShieldAlert, 
  Hammer, 
  Settings, 
  LogOut,
  Shield,
  Zap,
  Briefcase,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
  Layout,
  Building2,
  ShieldAlert,
  Hammer,
  Settings,
  Shield,
  Zap,
  Briefcase,
  Heart
};

interface SidebarProps {
  navItems: any[];
}

export function Sidebar({ navItems }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#0f1f3d] h-screen flex flex-col fixed left-0 top-0 text-white z-50 shadow-2xl">
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#c9920a]" />
          </div>
          <div className="font-bold text-lg tracking-tight">AIC Portal</div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = ICON_MAP[item.icon] || Layout;
            const isActive = pathname === item.href;

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl transition-all group",
                    isActive 
                      ? "bg-[#c9920a] text-white shadow-lg shadow-[#c9920a]/20" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-[#c9920a]/60 group-hover:text-[#c9920a]")} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/40 group-hover:text-white/60 transition-colors">
                      {item.badge}
                    </span>
                  )}
                </Link>
                
                {item.items && (
                  <div className="ml-9 mt-2 space-y-1 border-l border-white/5 pl-4">
                    {item.items.map((sub: any) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={cn(
                          "block text-xs py-2 transition-colors",
                          pathname === sub.href ? "text-[#c9920a] font-bold" : "text-white/40 hover:text-white"
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 p-3 text-white/40 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all text-sm font-medium">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
