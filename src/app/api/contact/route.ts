import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Location to store incoming leads securely
const LEADS_FILE_PATH = path.join(process.cwd(), "leads_log.json");

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

    // Lead log object
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "N/A",
      message: message ? message.trim() : "None",
      formType: type || "General Enquiry",
    };

    // Read current leads file or initialize empty list
    let existingLeads = [];
    try {
      if (fs.existsSync(LEADS_FILE_PATH)) {
        const fileContent = fs.readFileSync(LEADS_FILE_PATH, "utf8");
        existingLeads = JSON.parse(fileContent);
      }
    } catch (readError) {
      console.error("Failed to read leads log, initializing list:", readError);
    }

    // Append new lead
    existingLeads.unshift(newLead); // Add new lead to the top

    // Write updated logs back to workspace JSON file
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(existingLeads, null, 2), "utf8");

    console.log(`[LEAD RECEIVED]: ${newLead.name} (${newLead.phone}) via ${newLead.formType}`);

    /* 
      ========================================================================
      PRO TIP: INTEGRATE EMAIL SERVICE IN THE FUTURE
      ========================================================================
      To send leads instantly to your email, you can integrate services like
      Resend, SendGrid, or Nodemailer here:
      
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'leads@vantaraheritage.co.in',
        to: 'your-email@example.com',
        subject: `New Lead: ${newLead.name} - ${newLead.formType}`,
        html: `
          <h3>New Lead Registered</h3>
          <p><strong>Name:</strong> ${newLead.name}</p>
          <p><strong>Phone:</strong> ${newLead.phone}</p>
          <p><strong>Email:</strong> ${newLead.email}</p>
          <p><strong>Message:</strong> ${newLead.message}</p>
          <p><strong>Source Form:</strong> ${newLead.formType}</p>
          <p><strong>Time:</strong> ${newLead.timestamp}</p>
        `
      });
    */

    return NextResponse.json(
      { success: true, message: "Lead registered successfully.", leadId: newLead.id },
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
