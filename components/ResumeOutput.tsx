"use client";

import { useState } from "react";

type ResumeOutputProps = {
  resume: string;
  onRestart: () => void;
};

export default function ResumeOutput({ resume, onRestart }: ResumeOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2 style={{ color: "#c8f542", fontSize: 20, fontWeight: 700, margin: 0 }}>
          Your Resume
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? "#1a2e00" : "#111",
              border: "1px solid #c8f542",
              color: "#c8f542",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: 1,
              fontFamily: "inherit",
            }}
          >
            {copied ? "COPIED" : "COPY"}
          </button>
          <button
            onClick={onRestart}
            style={{
              background: "#c8f542",
              border: "none",
              color: "#0a0a0a",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: 1,
              fontWeight: 700,
              fontFamily: "inherit",
            }}
          >
            NEW RESUME
          </button>
        </div>
      </div>
      <div
        style={{
          background: "#0d0d0d",
          border: "1px solid #1e1e1e",
          borderRadius: 10,
          padding: 28,
          whiteSpace: "pre-wrap",
          lineHeight: 1.8,
          fontSize: 14,
          color: "#ccc",
          fontFamily: "Courier New, monospace",
          maxHeight: 520,
          overflowY: "auto",
        }}
      >
        {resume}
      </div>
    </div>
  );
}
