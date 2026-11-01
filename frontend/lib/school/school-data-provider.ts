"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { initialSchoolData, isSchoolData, type SchoolData } from "@/lib/school/school-data";

const storageKey = "schoolos-demo-school-v2";

type SchoolDataContextValue = {
  data: SchoolData;
  updateData: (update: (current: SchoolData) => SchoolData) => void;
  hydrated: boolean;
  storageError: string;
};

const SchoolDataContext = createContext<SchoolDataContextValue | null>(null);

export function SchoolDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(initialSchoolData);
  const [hydrated, setHydrated] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (!isSchoolData(parsed)) throw new Error("Saved demo data has an invalid format.");
        setData(parsed);
      }
      setStorageReady(true);
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Demo data could not be loaded.");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || !storageReady) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
      setStorageError("");
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Demo changes could not be saved.");
    }
  }, [data, hydrated, storageReady]);

  const updateData = useCallback((update: (current: SchoolData) => SchoolData) => {
    setData(update);
  }, []);

  const value = useMemo(() => ({ data, updateData, hydrated, storageError }), [data, updateData, hydrated, storageError]);
  return <SchoolDataContext.Provider value={value}>{children}</SchoolDataContext.Provider>;
}

export function useSchoolData() {
  const context = useContext(SchoolDataContext);
  if (!context) throw new Error("useSchoolData must be used within SchoolDataProvider.");
  return context;
}
