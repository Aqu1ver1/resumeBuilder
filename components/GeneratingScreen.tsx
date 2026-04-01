"use client";

import { useEffect, useState } from "react";

export default function GeneratingScreen() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((current: string) => (current.length >= 3 ? "." : `${current}.`));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div
        style={{
          width: 80,
          height: 80,
          margin: "0 auto 32px",
          border: "3px solid #222",
          borderTop: "3px solid #c8f542",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      <h2 style={{ color: "#c8f542", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        AI is crafting your resume{dots}
      </h2>
      <p style={{ color: "#555", fontSize: 14, letterSpacing: 1 }}>
        Analyzing your experience - Optimizing keywords - Formatting
      </p>
    </div>
  );
}
