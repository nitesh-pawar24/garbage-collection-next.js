'use client';
import React, { createContext, useContext, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const VIEW_TO_PATH = {
  'home': '/',
  'about': '/about',
  'contact': '/contact',
  'complaint': '/complaint',
  'submitComplaint': '/complaint',
  'login': '/login',
  'login-household': '/login-household',
  'login-company': '/login-company',
  'forgot-password': '/forgot-password',
  'register': '/register',
  'household-dashboard': '/dashboard/household',
  'company-dashboard': '/dashboard/company',
  'admin-dashboard': '/dashboard/admin',
  'schedule-booking': '/schedule-booking',
  'user-profile': '/user-profile',
  'payments': '/payments',
  'users-management': '/users-management',
  'companies-management': '/companies-management',
  'fleet-management': '/fleet-management',
  'complaints-management': '/complaints-management',
  'system-settings': '/system-settings',
  'howItWorks': '/how-it-works',
  'statisticsReports': '/statistics',
  'viewSchedule': '/view-schedule',
  'guidesResources': '/guides-resources',
  'eventsWorkshops': '/events',
  'newsUpdates': '/news',
  'gallery': '/gallery',
  'legal': '/legal',
  'faqsFeedback': '/faqs',
};

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback((viewOrPath) => {
    const target = VIEW_TO_PATH[viewOrPath] || viewOrPath;
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    router.push(target);
  }, [router]);

  return (
    <NavigationContext.Provider value={{ navigate, currentPath: pathname }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigate = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    // fallback if used outside provider
    const router = useRouter();
    return (viewOrPath) => {
      const target = VIEW_TO_PATH[viewOrPath] || viewOrPath;
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
      router.push(target);
    };
  }
  return context.navigate;
};
