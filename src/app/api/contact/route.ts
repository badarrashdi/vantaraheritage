import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, type } = body;

    // Server-side validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Mobile Number are required on the server." },
        { status: 400 }
      );
    }

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();
    const formType = type || "General Enquiry";

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Vantara Heritage <onboarding@resend.dev>",
      to: ["badarrashdi@gmail.com"],
      subject: `New Lead: ${name} - ${formType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a5c38; border-bottom: 2px solid #1a5c38; padding-bottom: 10px;">
            New Lead Registered
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email ? email.trim() : "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${message ? message.trim() : "None"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Form Type:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${formType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Timestamp:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Lead ID:</td>
              <td style="padding: 10px;">${leadId}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      return NextResponse.json(
        { error: "Failed to send email notification." },
        { status: 500 }
      );
    }

    console.log(`[LEAD RECEIVED]: ${name} (${phone}) via ${formType} - Email ID: ${data?.id}`);

    return NextResponse.json(
      { success: true, message: "Lead registered successfully.", leadId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead registration failed on the server:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to process lead." },
      { status: 500 }
    );
  }
}
