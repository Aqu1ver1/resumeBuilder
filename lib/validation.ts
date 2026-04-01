import type { ResumeForm } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameWordRegex = /^[A-Z][a-zA-Z'-]*$/;
const phoneRegex = /^\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?$/;

const hasExperience = (form: ResumeForm) =>
  form.experience.some(exp =>
    [exp.company, exp.role, exp.description].some(value => value.trim())
  );

const validateStepInfo = (form: ResumeForm): string => {
  const missing: string[] = [];

  if (!form.name.trim()) missing.push("Full name");
  if (!form.email.trim()) missing.push("Email");
  if (!form.title.trim()) missing.push("Target job title");

  if (missing.length > 0) {
    return `Please fill: ${missing.join(", ")}.`;
  }

  const trimmedName = form.name.trim();
  const nameParts = trimmedName.split(/\s+/).filter(Boolean);
  if (nameParts.length < 2 || !nameParts.every(part => nameWordRegex.test(part))) {
    return "Full name must contain at least two words, each starting with an uppercase letter.";
  }

  if (!emailRegex.test(form.email.trim())) {
    return "Please enter a valid email address.";
  }

  if (form.phone.trim() && !phoneRegex.test(form.phone.trim())) {
    return "Phone number must look like +1234567890.";
  }

  return "";
};

const validateStepExperience = (form: ResumeForm): string => {
  if (!hasExperience(form)) {
    return "Please add at least one experience entry.";
  }

  return "";
};

const validateStepSkills = (form: ResumeForm): string => {
  if (!form.skills.trim()) {
    return "Please list at least one skill.";
  }

  return "";
};

export const validateStep = (form: ResumeForm, step: number): string => {
  if (step === 0) return validateStepInfo(form);
  if (step === 1) return validateStepExperience(form);
  if (step === 2) return validateStepSkills(form);
  return "";
};

export const validateForm = (form: ResumeForm): string => {
  const infoError = validateStepInfo(form);
  if (infoError) return infoError;

  const expError = validateStepExperience(form);
  if (expError) return expError;

  const skillsError = validateStepSkills(form);
  if (skillsError) return skillsError;

  return "";
};
