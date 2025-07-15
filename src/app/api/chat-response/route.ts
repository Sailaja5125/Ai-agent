import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export const maxDuration = 30; // Allow streaming responses up to 30 seconds

// Utility: Extract Subject line from email text
function extractSubject(emailText: string): string | null {
  const subjectRegex = /^Subject:\s*(.*)$/im;
  const match = emailText.match(subjectRegex);
  return match ? match[1].trim() : null;
}

// Utility: Clean unwanted meta output (if any)
function cleanOutput(text: string): string {
  return text.replace(/^(model|usage|id|object):.*$/gmi, '').trim();
}

export async function POST(req: Request) {
  try {
    console.log("Your Chat bot is ready");

    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    // Prompt 1: Text response to user instruction
    const prompt = `
As a generative AI, you are required to generate exactly what the user asks. For example, if a user asks to send a leave letter email to someone, generate only that email content. Do NOT include extra messages like "Want to tweak the tone..." or anything outside what the user requested.

Do NOT add harmful, unsafe, or unrequested content.

Keep your output simple, easy to read, and limited only to what is asked.

Now generate the response for the following messages: ${messages}
    `.trim();

    const { text: plainTextResponse } = await generateText({
      model: groq('gemma2-9b-it'),
      prompt: prompt,
    });

    const cleanText = cleanOutput(plainTextResponse);

    // Prompt 2: Generate email-compatible HTML if it's a leave letter
    const prompt2 = `
You are to convert the given text into a clean HTML <body> suitable for email platforms like Mailchimp, without changing the content.

Only do this if the text is an email. If not, respond with "NO" (only "NO").

Rules:
- Preserve sender's content exactly.
- Add input fields if provided (manager name, sender, start/end date, reason).
- Use inline CSS styles.
- Do NOT include <html> or <head> tags.
- Keep styling minimal and readable.
Now convert this text into HTML body content: ${cleanText}
    `.trim();

    const { text: htmlBodyContent } = await generateText({
      model: groq('gemma2-9b-it'),
      prompt: prompt2,
    });

    const cleanHtml = cleanOutput(htmlBodyContent);

    // Extract email addresses
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = messages.match(emailRegex) || [];

    const subject = extractSubject(cleanText);

    // Final response data
    const data = {
      email: foundEmails ,
      text: cleanText,
      response: cleanHtml,
      subject: subject || "No Subject",
    };

    return Response.json(
      { success: true, message: "AI generated an email", data },
      { status: 200 }
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in email generator:", errMsg);
    return new Response(errMsg, { status: 500 });
  }
}
