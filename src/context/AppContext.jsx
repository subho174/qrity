"use client";

import { createContext, useContext, useState } from "react";
const AppContext = createContext();

export function AppProvider({ children }) {
  const [studentId, setstudentId] = useState();
  const [courseId, setCourseId] = useState();
  const [sessionId2, setsessionId2] = useState();
  const [presentPercentage, setpresentPercentage] = useState();
  const [count, setcount] = useState(0);

  return (
    <AppContext.Provider
      value={{
        count,
        setcount,
        studentId,
        setstudentId,
        courseId,
        setCourseId,
        sessionId2,
        setsessionId2,
        presentPercentage,
        setpresentPercentage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
