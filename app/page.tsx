"use client";

import type { ChangeEvent, MouseEvent } from "react";
import StepIndicator from "../components/StepIndicator";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import GeneratingScreen from "../components/GeneratingScreen";
import ResumeOutput from "../components/ResumeOutput";
import { LANGUAGES } from "../lib/constants";
import { useResumeForm } from "../hooks/useResumeForm";
import type { ErrorResponse, GenerateResponse } from "../lib/types";

export default function Page() {
  const {
    step,
    setStep,
    form,
    update,
    updateExp,
    addExp,
    resume,
    setResume,
    error,
    setError,
    reset,
    validate,
    validateStep,
  } = useResumeForm();

  const generateResume = async () => {
    const validationMessage = validate();
    if (validationMessage) {
      setError(validationMessage);
      setStep(2);
      return;
    }

    setStep(3);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form }),
      });

      const data = (await response.json()) as GenerateResponse | ErrorResponse;

      if (!response.ok) {
        throw new Error("error" in data ? data.error : "No response from AI");
      }

      if ("resume" in data && data.resume) {
        setResume(data.resume);
        setStep(4);
      } else {
        throw new Error("No response from AI");
      }
    } catch (fetchError) {
      setError("Something went wrong. Please try again.");
      setStep(2);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "DM Sans, Helvetica Neue, sans-serif",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              color: "#c8f542",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            AI POWERED
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #fff 0%, #888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Resume Builder
          </h1>
          <p style={{ color: "#444", fontSize: 14, marginTop: 12 }}>
            Fill in your details - AI generates your resume
          </p>
        </div>

        <div
          style={{
            background: "#0f0f0f",
            border: "1px solid #1a1a1a",
            borderRadius: 16,
            padding: "36px 32px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          {step !== 3 && step !== 4 && <StepIndicator current={step} />}

          {step === 0 && (
            <div>
              <h2
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 24,
                  marginTop: 0,
                }}
              >
                Personal Information
              </h2>
              <Input label="Full Name" value={form.name} onChange={value => update("name", value)} placeholder="John Doe" />
              <Input label="Email" value={form.email} onChange={value => update("email", value)} placeholder="john@email.com" type="email" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Phone" value={form.phone} onChange={value => update("phone", value)} placeholder="+421 900 000 000" />
                <Input label="Location" value={form.location} onChange={value => update("location", value)} placeholder="Bratislava, Slovakia" />
              </div>
              <Input label="Target Job Title" value={form.title} onChange={value => update("title", value)} placeholder="Frontend Developer" />
              <ul style={{ color: "#555", fontSize: 12, margin: "-6px 0 18px", paddingLeft: 18, lineHeight: 1.6 }}>
                <li>Use a specific role: "Frontend Developer" or "Product Designer".</li>
                <li>Add seniority if relevant: "Senior", "Lead", "Junior".</li>
                <li>Match the target job listing for ATS keywords.</li>
              </ul>
              <Textarea
                label="Brief Summary"
                value={form.summary}
                onChange={value => update("summary", value)}
                placeholder="Tell us a bit about yourself and your goals..."
                rows={3}
              />
              {error && (
                <div
                  style={{
                    background: "#1a0000",
                    border: "1px solid #440000",
                    borderRadius: 8,
                    padding: 14,
                    color: "#ff6b6b",
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}
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
                  Resume Language
                </label>
                <select
                  value={form.language}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => update("language", event.target.value)}
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: 8,
                    padding: "12px 14px",
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  {LANGUAGES.map(language => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  const stepError = validateStep(0);
                  if (stepError) {
                    setError(stepError);
                    return;
                  }
                  setError("");
                  setStep(1);
                }}
                style={{
                  width: "100%",
                  background: "#c8f542",
                  border: "none",
                  color: "#0a0a0a",
                  padding: "14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 1,
                  fontFamily: "inherit",
                  marginTop: 8,
                }}
              >
                NEXT: EXPERIENCE
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 24,
                  marginTop: 0,
                }}
              >
                Work Experience
              </h2>
              {form.experience.map((exp, i) => (
                <div
                  key={`experience-${i}`}
                  style={{
                    border: "1px solid #1e1e1e",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "#c8f542",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    Position {i + 1}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Input label="Company" value={exp.company} onChange={value => updateExp(i, "company", value)} placeholder="Google" />
                    <Input label="Role" value={exp.role} onChange={value => updateExp(i, "role", value)} placeholder="Frontend Developer" />
                  </div>
                  <Input label="Duration" value={exp.duration} onChange={value => updateExp(i, "duration", value)} placeholder="Jan 2022 - Dec 2024" />
                  <Textarea
                    label="Description"
                    value={exp.description}
                    onChange={value => updateExp(i, "description", value)}
                    placeholder="What did you build, achieve, improve?"
                    rows={2}
                  />
                </div>
              ))}
              <button
                onClick={addExp}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "1px dashed #333",
                  color: "#555",
                  padding: "12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "inherit",
                  marginBottom: 20,
                  transition: "all 0.2s",
                }}
                onMouseOver={(event: MouseEvent<HTMLButtonElement>) => {
                  event.currentTarget.style.borderColor = "#c8f542";
                  event.currentTarget.style.color = "#c8f542";
                }}
                onMouseOut={(event: MouseEvent<HTMLButtonElement>) => {
                  event.currentTarget.style.borderColor = "#333";
                  event.currentTarget.style.color = "#555";
                }}
              >
                + ADD POSITION
              </button>
              <Input
                label="Education"
                value={form.education}
                onChange={value => update("education", value)}
                placeholder="BSc Computer Science, CTU Prague, 2021"
              />
              {error && (
                <div
                  style={{
                    background: "#1a0000",
                    border: "1px solid #440000",
                    borderRadius: 8,
                    padding: 14,
                    color: "#ff6b6b",
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button
                  onClick={() => {
                    setError("");
                    setStep(0);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #222",
                    color: "#555",
                    padding: "14px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: "inherit",
                  }}
                >
                  BACK
                </button>
                <button
                  onClick={() => {
                    const stepError = validateStep(1);
                    if (stepError) {
                      setError(stepError);
                      return;
                    }
                    setError("");
                    setStep(2);
                  }}
                  style={{
                    background: "#c8f542",
                    border: "none",
                    color: "#0a0a0a",
                    padding: "14px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: 1,
                    fontFamily: "inherit",
                  }}
                >
                  NEXT: SKILLS
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 24,
                  marginTop: 0,
                }}
              >
                Skills and Extras
              </h2>
              <Textarea
                label="Technical Skills"
                value={form.skills}
                onChange={value => update("skills", value)}
                placeholder="React, TypeScript, Node.js, PostgreSQL, Docker, Git, REST APIs, AI integration..."
                rows={4}
              />
              {error && (
                <div
                  style={{
                    background: "#1a0000",
                    border: "1px solid #440000",
                    borderRadius: 8,
                    padding: 14,
                    color: "#ff6b6b",
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}
              <div
                style={{
                  background: "#0d1a00",
                  border: "1px solid #1e3300",
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#c8f542",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  AI WILL OPTIMIZE
                </div>
                <p style={{ color: "#666", fontSize: 13, margin: 0, lineHeight: 1.7 }}>
                  Claude AI will craft compelling bullet points, optimize for ATS systems, and make your experience shine in {form.language}.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button
                  onClick={() => {
                    setError("");
                    setStep(1);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #222",
                    color: "#555",
                    padding: "14px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: "inherit",
                  }}
                >
                  BACK
                </button>
                <button
                  onClick={generateResume}
                  style={{
                    background: "#c8f542",
                    border: "none",
                    color: "#0a0a0a",
                    padding: "14px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: 1,
                    fontFamily: "inherit",
                  }}
                >
                  GENERATE RESUME
                </button>
              </div>
            </div>
          )}

          {step === 3 && <GeneratingScreen />}

          {step === 4 && <ResumeOutput resume={resume} onRestart={reset} />}
        </div>

        <p style={{ textAlign: "center", color: "#2a2a2a", fontSize: 12, marginTop: 24, letterSpacing: 1 }}>
          POWERED BY CLAUDE AI - ANTHROPIC
        </p>
      </div>
    </div>
  );
}
