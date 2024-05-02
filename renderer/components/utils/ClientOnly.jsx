"use client";

import { useContext, useEffect, useState } from "react";
import { UidContext } from "@/context/UidContext";

import Spinner from "./Spinner";

export default function ClientOnly({ children, spin, activeTopLoading }) {
  const { setLoadingBar } = useContext(UidContext);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (activeTopLoading) {
      setLoadingBar(0);
      setLoadingBar(100);
    }
  }, []);

  useEffect(() => {
    if (mounted && activeTopLoading) {
      setTimeout(() => {
        setLoadingBar(0);
      }, 500);
    }
  }, [mounted]);

  if (typeof window === "undefined") {
    return null;
  } else if (!mounted && spin) {
    return <Spinner />;
  } else if (!mounted) return null;

  return <>{children}</>;
}
