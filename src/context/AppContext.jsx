"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [courses, setcourses] = useState();
  const [sessionURL, setsessionURL] = useState("");
  return (
    <AppContext.Provider
      value={{ courses, setcourses, sessionURL, setsessionURL }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
