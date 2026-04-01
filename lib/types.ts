export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
};

export type ResumeForm = {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  experience: Experience[];
  education: string;
  skills: string;
  language: string;
};

export type GeneratePayload = {
  form: ResumeForm;
};

export type GenerateResponse = {
  resume: string;
};

export type ErrorResponse = {
  error: string;
};
