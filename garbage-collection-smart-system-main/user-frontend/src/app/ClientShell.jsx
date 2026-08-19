'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { PanchayatProvider } from '@/context/PanchayatContext';
import { NavigationProvider, useAppNavigate } from '@/context/NavigationContext';
import Navbar from '@/component/Navbar';
import Footer from '@/component/shared/Footer';
import GlobalScrollLock from '@/component/shared/GlobalScrollLock';
import PanchayatModal from '@/component/shared/PanchayatModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShellContent({ children }) {
  const pathname = usePathname();
  const navigate = useAppNavigate();

  return (
    <>
      <GlobalScrollLock />
      <Navbar navigate={navigate} currentPage={pathname} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer navigate={navigate} />
      <PanchayatModal />
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        toastClassName="!rounded-2xl !shadow-xl !font-sans !text-sm"
        progressClassName="!bg-green-500"
      />
    </>
  );
}

export default function ClientShell({ children }) {
  return (
    <PanchayatProvider>
      <NavigationProvider>
        <ShellContent>{children}</ShellContent>
      </NavigationProvider>
    </PanchayatProvider>
  );
}
