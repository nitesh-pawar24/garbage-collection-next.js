'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const PanchayatContext = createContext(null);

export const PanchayatProvider = ({ children }) => {
  const [selectedPanchayat, setSelectedPanchayat] = useState(null);
  const [isPanchayatModalOpen, setIsPanchayatModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedPanchayat');
      if (stored) {
        try {
          setSelectedPanchayat(JSON.parse(stored));
        } catch {
          setSelectedPanchayat(null);
        }
      } else {
        setIsPanchayatModalOpen(true);
      }
    }
  }, []);

  const refreshPanchayatData = async () => {
    if (!selectedPanchayat?._id) return;
    try {
      const res = await api.get(`/panchayat/${selectedPanchayat._id}`);
      if (res.data) {
        setSelectedPanchayat(res.data);
      }
    } catch (err) {
      console.error("Failed to refresh panchayat data:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedPanchayat) {
        localStorage.setItem('selectedPanchayat', JSON.stringify(selectedPanchayat));
        setIsPanchayatModalOpen(false);
      }
    }
  }, [selectedPanchayat]);

  return (
    <PanchayatContext.Provider value={{ 
      selectedPanchayat, 
      setSelectedPanchayat, 
      isPanchayatModalOpen, 
      setIsPanchayatModalOpen,
      refreshPanchayatData
    }}>
      {children}
    </PanchayatContext.Provider>
  );
};

export const usePanchayat = () => {
  const context = useContext(PanchayatContext);
  if (!context) {
    throw new Error('usePanchayat must be used within a PanchayatProvider');
  }
  return context;
};
