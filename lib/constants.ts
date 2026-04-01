import type { Experience, ResumeForm } from "./types";

export const STEPS = ["info", "experience", "skills", "generating", "result"] as const;

export const STEP_LABELS = ["Personal", "Experience", "Skills", "Result"] as const;

export const STEP_INDEX = [0, 1, 2, 4] as const;

export const LANGUAGES = ["English", "Slovak", "Czech", "German", "Russian"] as const;

export const emptyExperience: Experience = {
  company: "",
  role: "",
  duration: "",
  description: "",
};

export const initialForm: ResumeForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  title: "",
  summary: "",
  experience: [emptyExperience],
  education: "",
  skills: "",
  language: "English",
};
