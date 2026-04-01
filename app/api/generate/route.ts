import { validateForm } from "../../../lib/validation";
import type { GeneratePayload, ResumeForm } from "../../../lib/types";

const DEFAULT_MODEL = "claude-sonnet-4-20250514";

const buildPrompt = (form: ResumeForm) => {
  const experienceText = form.experience
    .map(item => `${item.role || ""} at ${item.company || ""} (${item.duration || ""}): ${item.description || ""}`)
    .join("\n");

  return `Create a professional, ATS-optimized resume in ${form.language || "English"} for the following person. Format it cleanly with clear sections. Make the summary compelling and the bullet points achievement-focused with action verbs.\n\nName: ${form.name || ""}\nEmail: ${form.email || ""}\nPhone: ${form.phone || ""}\nLocation: ${form.location || ""}\nDesired Title: ${form.title || ""}\nSummary/Background: ${form.summary || ""}\n\nExperience:\n${experienceText}\n\nEducation: ${form.education || ""}\nSkills: ${form.skills || ""}\n\nWrite a complete, professional resume. Use standard resume formatting with sections: Contact Info, Professional Summary, Work Experience, Education, Skills. Make it stand out.`;
};

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "Server missing ANTHROPIC_API_KEY." }, { status: 500 });
  }

  let payload: GeneratePayload | null = null;
  try {
    payload = (await request.json()) as GeneratePayload;
  } catch (error) {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload?.form) {
    return Response.json({ error: "Missing form data." }, { status: 400 });
  }

  const validationMessage = validateForm(payload.form);
  if (validationMessage) {
    return Response.json({ error: validationMessage }, { status: 400 });
  }

  const prompt = buildPrompt(payload.form);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data?.error?.message || "Anthropic request failed." }, { status: response.status });
    }

    const text = data?.content?.[0]?.text;
    if (!text) {
      return Response.json({ error: "No response from AI." }, { status: 502 });
    }

    return Response.json({ resume: text }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "AI request failed." }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
