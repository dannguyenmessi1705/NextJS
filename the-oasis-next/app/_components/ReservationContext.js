"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initState = {
  from: null,
  to: null,
};

export function ReservationProvider({ children }) {
  const [range, setRange] = useState(initState);
  const resetRange = () => setRange(initState);
  const context = { range, setRange, resetRange };
  return (
    <ReservationContext.Provider value={context}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}
