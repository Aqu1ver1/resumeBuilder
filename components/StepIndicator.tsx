"use client";

import { STEP_INDEX, STEP_LABELS } from "../lib/constants";

type StepIndicatorProps = {
  current: number;
};

export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40 }}>
      {STEP_LABELS.map((label, i) => {
        const active = current >= STEP_INDEX[i];
        const isCurrent = current === STEP_INDEX[i];
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: active ? "#c8f542" : "transparent",
                  border: `2px solid ${active ? "#c8f542" : "#333"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: active ? "#0a0a0a" : "#555",
                  transition: "all 0.3s ease",
                  boxShadow: isCurrent ? "0 0 20px rgba(200,245,66,0.4)" : "none",
                }}
              >
                {i + 1}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: active ? "#c8f542" : "#444",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                style={{
                  width: 60,
                  height: 2,
                  margin: "0 4px",
                  marginBottom: 22,
                  background: current > STEP_INDEX[i] ? "#c8f542" : "#222",
                  transition: "background 0.3s ease",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
