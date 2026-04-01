"use client";

import type { ChangeEvent, FocusEvent } from "react";

type TextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export default function Textarea({ label, value, onChange, placeholder, rows = 3 }: TextareaProps) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#888",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          background: "#111",
          border: "1px solid #222",
          borderRadius: 8,
          padding: "12px 14px",
          color: "#fff",
          fontSize: 14,
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
          fontFamily: "inherit",
          lineHeight: 1.6,
        }}
        onFocus={(event: FocusEvent<HTMLTextAreaElement>) => {
          event.target.style.borderColor = "#c8f542";
        }}
        onBlur={(event: FocusEvent<HTMLTextAreaElement>) => {
          event.target.style.borderColor = "#222";
        }}
      />
    </div>
  );
}
