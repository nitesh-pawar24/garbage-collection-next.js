'use client';
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users2,
  Clock,
  Trash2,
  Home as HomeIcon,
  MapPin,
  FileText,
  BarChart3,
  TrendingUp,
  Image,
  BookOpen,
  Users,
  Scale,
  CalendarDays,
  Newspaper,
  ChevronDown,
  X,
  Sparkles,
  Calendar,
  Mail
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  const { isDark } = useTheme()

  const [openDropdowns, setOpenDropdowns] = useState({
    wasteManagement: true,
    dynamicPages: false,
  })

  useEffect(() => {
    const isWasteRoute = ['/employee', '/attendance', '/dustbin', '/household', '/route', '/ward'].some(p => pathname?.startsWith(p))
    const isDynamicRoute = ['/edit-about-us', '/edit-guide', '/gallery', '/legal', '/manage-events', '/manage-news', '/manage-schedule', '/manage-leadership'].some(p => pathname?.startsWith(p))

    if (isWasteRoute) setOpenDropdowns(prev => ({ ...prev, wasteManagement: true }))
    if (isDynamicRoute) setOpenDropdowns(prev => ({ ...prev, dynamicPages: true }))
  }, [pathname])

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const NavLink = ({ to, icon: Icon, label, small = false }) => {
    const active = pathname === to

    return (
      <Link
        href={to}
        onClick={onClose}
        className={`
          flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group relative no-underline
          ${small ? 'text-xs pl-8' : 'text-sm font-bold'}
          ${active
            ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold'
            : isDark
              ? 'text-gray-400 hover:bg-slate-800/60 hover:text-gray-200'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
      >
        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-500 rounded-r-full" />
        )}
        <Icon
          size={small ? 14 : 17}
          className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
            active ? 'text-teal-500' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
          }`}
        />
        <span className="truncate">{label}</span>
      </Link>
    )
  }

  const DropdownHeader = ({ title, icon: Icon, isOpen: dropOpen, onClick, isChildActive }) => (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200
        ${isChildActive
          ? 'text-teal-600 dark:text-teal-400'
          : isDark
            ? 'text-gray-400 hover:bg-slate-800/60 hover:text-gray-200'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <Icon size={17} className={isChildActive ? 'text-teal-500' : 'text-gray-400'} />
        <span>{title}</span>
      </div>
      <ChevronDown
        size={14}
        className={`transition-transform duration-200 ${dropOpen ? 'rotate-180 text-teal-500' : 'text-gray-400'}`}
      />
    </button>
  )

  const isWasteActive = ['/employee', '/attendance', '/dustbin', '/household', '/route', '/ward'].some(p => pathname?.startsWith(p))
  const isDynamicActive = ['/edit-about-us', '/edit-guide', '/gallery', '/legal', '/manage-events', '/manage-news', '/manage-schedule', '/manage-leadership'].some(p => pathname?.startsWith(p))

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 lg:static lg:z-auto
          flex flex-col border-r transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
        }}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20 text-white font-black text-xl">
              E
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight leading-none" style={{ color: isDark ? 'white' : '#0f172a' }}>
                EcoSyz <span className="text-teal-500 font-bold text-xs uppercase px-1 py-0.5 rounded bg-teal-500/10 ml-0.5">Admin</span>
              </h1>
              <p className="text-[10px] text-gray-400 mt-1 font-medium">Smart Waste System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Main Menu</p>
          
          <NavLink to="/dashboard" icon={Home} label="Central Admin Dashboard" />

          {/* Waste Management Dropdown */}
          <div className="space-y-0.5">
            <DropdownHeader
              title="Waste Management"
              icon={Trash2}
              isOpen={openDropdowns.wasteManagement}
              onClick={() => toggleDropdown('wasteManagement')}
              isChildActive={isWasteActive}
            />
            {openDropdowns.wasteManagement && (
              <div className="space-y-0.5 pt-0.5">
                <NavLink to="/employee" icon={Users2} label="Employee Management" small />
                <NavLink to="/attendance" icon={Clock} label="Attendance Management" small />
                <NavLink to="/dustbin" icon={Trash2} label="Dustbin Management" small />
                <NavLink to="/household" icon={HomeIcon} label="Household Management" small />
                <NavLink to="/route" icon={MapPin} label="Route Management" small />
                <NavLink to="/ward" icon={MapPin} label="Ward Management" small />
              </div>
            )}
          </div>

          <NavLink to="/report-complaint" icon={FileText} label="Report & Complaint Mgmt" />
          <NavLink to="/waste-data" icon={BarChart3} label="Waste Data Management" />
          <NavLink to="/contact-queries" icon={Mail} label="Contact Queries" />
          <NavLink to="/schedule-bookings" icon={Calendar} label="Schedule Bookings" />

          <p className="px-3 pt-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">CMS & Content</p>

          {/* Dynamic Pages Dropdown */}
          <div className="space-y-0.5">
            <DropdownHeader
              title="Dynamic Pages"
              icon={Sparkles}
              isOpen={openDropdowns.dynamicPages}
              onClick={() => toggleDropdown('dynamicPages')}
              isChildActive={isDynamicActive}
            />
            {openDropdowns.dynamicPages && (
              <div className="space-y-0.5 pt-0.5">
                <NavLink to="/edit-about-us" icon={BookOpen} label="Edit About Us" small />
                <NavLink to="/edit-guide" icon={BookOpen} label="Edit Segregation Guide" small />
                <NavLink to="/gallery" icon={Image} label="Manage Photo Gallery" small />
                <NavLink to="/manage-events" icon={CalendarDays} label="Events & Workshops" small />
                <NavLink to="/manage-news" icon={Newspaper} label="News & Updates" small />
                <NavLink to="/manage-schedule" icon={Calendar} label="Ward Schedule" small />
                <NavLink to="/manage-leadership" icon={Users} label="Leadership" small />
              </div>
            )}
          </div>

          <NavLink to="/reports" icon={TrendingUp} label="Report Generation & Analytics" />
          <NavLink to="/settings" icon={Users} label="User Management & Settings" />
          <NavLink to="/legal" icon={Scale} label="Legal & Transparency" />
        </div>

        {/* Footer info */}
        <div className="p-3 border-t text-center"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="p-2.5 rounded-xl bg-teal-500/5 dark:bg-teal-500/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
              V1
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold" style={{ color: isDark ? 'white' : '#0f172a' }}>Panchayat System</p>
              <p className="text-[9px] text-gray-400">All systems online</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
