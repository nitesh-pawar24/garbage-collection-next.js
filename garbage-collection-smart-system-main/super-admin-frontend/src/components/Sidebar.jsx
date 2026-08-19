'use client';
import { LayoutDashboard, CreditCard, HelpCircle, Layers, Leaf, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Panchayat Verification", path: "/dashboard", sub: "Review & manage requests", icon: LayoutDashboard },
  { name: "Subscription Plans", path: "/subscriptions", sub: "Tiers & pricing setup", icon: Layers },
  { name: "Payment Monitoring", path: "/payments", sub: "Transactions & payouts", icon: CreditCard },
  { name: "Support & Queries", path: "/support", sub: "Tickets & complaints", icon: HelpCircle },
];

export default function Sidebar({ onClose }) {
  const pathname = usePathname();

  return (
    <div className="w-[280px] bg-slate-900 border-r border-white/5 flex flex-col shrink-0 h-full">
      {/* Brand header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Leaf size={20} color="white" />
          </div>
          <div>
            <div className="text-[17px] font-black tracking-tight text-white flex items-center gap-1">
              EcoSyz <span className="text-[10px] uppercase tracking-widest bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-md font-bold">Admin</span>
            </div>
            <div className="text-[11px] text-white/35 font-medium">Smart Waste Platform</div>
          </div>
        </div>

        {/* Close Button for Mobile Drawer */}
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/25 px-3 pt-2 pb-1.5">Platform</div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname?.startsWith(item.path));
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                transition-all duration-150 group text-left no-underline block
                ${isActive ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10 sidebar-nav-item"}
              `}
            >
              {/* Active left bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-indigo-500 rounded-r-sm" />
              )}
              <div className="flex items-center gap-3 w-full">
                <div className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 ${isActive ? "bg-indigo-500/25" : "bg-white/5"}`}>
                  <Icon size={17} color={isActive ? "#818cf8" : "rgba(255,255,255,0.45)"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[13px] leading-[1.2] ${isActive ? "font-bold text-indigo-100" : "font-medium text-white/70"}`}>{item.name}</div>
                  <div className="text-[11px] text-white/30 mt-0.5 truncate">{item.sub}</div>
                </div>
                {isActive && <ChevronRight size={14} color="#6366f1" className="shrink-0" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom bar */}
      <div className="p-4 border-t border-white/5 mx-1 mb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center font-extrabold text-[14px] text-white shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>S</div>
          <div>
            <div className="text-[13px] font-semibold text-white/85">Super Admin</div>
            <div className="text-[11px] text-white/35">ecosyz.in</div>
          </div>
        </div>
      </div>
    </div>
  );
}
