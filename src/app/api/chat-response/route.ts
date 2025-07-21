import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import * as XLSX from 'xlsx';
const nodemailer = require('nodemailer');
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const maxDuration = 30;

// Utility: Extract subject from the email content
function extractSubject(emailText: string): string | null {
  const subjectRegex = /^Subject:\s*(.*)$/im;
  const match = emailText.match(subjectRegex);
  return match ? match[1].trim() : null;
}

// Utility: Clean model metadata
function cleanOutput(text: string): string {
  return text.replace(/^(model|usage|id|object):.*$/gmi, '').trim();
}

// Utility: Extract email addresses from string
function extractEmails(text: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
}

// Parse Excel file and extract all email addresses
async function extractEmailsFromExcel(buffer: Buffer): Promise<string[]> {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const emailSet = new Set<string>();

  workbook.SheetNames.forEach(sheet => {
    const worksheet = workbook.Sheets[sheet];
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);
    rows.forEach(row => {
      Object.values(row).forEach(cell => {
        if (typeof cell === 'string') {
          extractEmails(cell).forEach(email => emailSet.add(email));
        }
      });
    });
  });

  return Array.from(emailSet);
}

// Create Nodemailer transporter


// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
function createTransporter() {
  return nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER||"992e90ed6af93e",
      pass: process.env.EMAIL_PASSWORD || "f3f140784059be",
    },
  });
}

// Send email
async function MailSender(to: string[], subject: string, html: string) {
  if (!to.length) throw new Error("Recipient email list is empty");

  const transporter = createTransporter();

  const info = await transporter.sendMail({
    from: `"NextMailer" <${process.env.EMAIL_USER}>`,
    to: to.join(','),
    subject,
    html,
  });

  return info;
}

// Main handler
export async function POST(req: Request) {
  try {
    console.log("🚀 AI Email Generation Triggered");

    const contentType = req.headers.get('content-type') || '';
    let messages = '';
    let excelEmails: string[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      messages = formData.get('messages')?.toString() || '';

      const file = formData.get('file') as File | null;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        excelEmails = await extractEmailsFromExcel(buffer);
      }
    } else {
      const body = await req.json();
      messages = body.messages || '';
    }

    if (!messages) {
      return new Response("No message provided", { status: 400 });
    }

    // Prompt 1: Generate HTML body content ONLY
    const prompt = `
You are an AI assistant that generates raw <body> HTML content for email.

Here is the user message:
"${messages}"

Respond ONLY with valid, production-ready HTML that would go inside an email's <body>.
Do NOT include <html>, <head>, or any explanation.
Only output the email body content exactly as the user intends.
    `.trim();

    const { text: aiText } = await generateText({
      model: groq('gemma2-9b-it'),
      prompt,
    });

    const cleanHtml = cleanOutput(aiText);

    const subject = extractSubject(messages) || "No Subject";
    const messageEmails = extractEmails(messages);
    const allEmails = Array.from(new Set([...messageEmails, ...excelEmails]));

    if (!allEmails.length) {
      return new Response("No valid email addresses found", { status: 400 });
    }

    const info = await MailSender(allEmails, subject, cleanHtml);

    return Response.json({
      success: true,
      message: "AI email sent successfully",
      data: {
        subject,
        recipients: allEmails,
        html: cleanHtml,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      },
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(error instanceof Error ? error.message : "Internal Server Error", {
      status: 500,
    });
  }
}
