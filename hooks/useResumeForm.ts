import { useState } from "react";
import { emptyExperience, initialForm } from "../lib/constants";
import { validateForm, validateStep } from "../lib/validation";
import type { Experience, ResumeForm } from "../lib/types";

export type UseResumeFormReturn = {
  step: number;
  setStep: (value: number) => void;
  form: ResumeForm;
  update: (field: keyof ResumeForm, value: string) => void;
  updateExp: (index: number, field: keyof Experience, value: string) => void;
  addExp: () => void;
  resume: string;
  setResume: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  reset: () => void;
  validate: () => string;
  validateStep: (step: number) => string;
};

export function useResumeForm(): UseResumeFormReturn {
  const [step, setStep] = useState<number>(0);
  const [form, setForm] = useState<ResumeForm>(initialForm);
  const [resume, setResume] = useState<string>("");
  const [error, setError] = useState<string>("");

  const update = (field: keyof ResumeForm, value: string) =>
    setForm((current: ResumeForm) => ({ ...current, [field]: value }));

  const updateExp = (index: number, field: keyof Experience, value: string) =>
    setForm((current: ResumeForm) => {
      const experience = [...current.experience];
      experience[index] = { ...experience[index], [field]: value };
      return { ...current, experience };
    });

  const addExp = () =>
    setForm((current: ResumeForm) => ({
      ...current,
      experience: [...current.experience, { ...emptyExperience }],
    }));

  const reset = () => {
    setStep(0);
    setForm(initialForm);
    setResume("");
    setError("");
  };

  const validate = () => validateForm(form);
  const validateStepForForm = (stepValue: number) => validateStep(form, stepValue);

  return {
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
    validateStep: validateStepForForm,
  };
}
