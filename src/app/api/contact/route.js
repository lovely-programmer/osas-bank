import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  const { email, name, message, subject } = await req.json();

  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
  };

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `${subject}`,
      html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family:Arial,Helvetica,sans-serif";padding-left:20px;padding-right:20px;line-height:25px;>
                  <p>You got a new message from ${name}</p>
                  <p style="margin-bottom: 20px;">${message}</p>
                  <p>Mail address: ${email}</p>
              </body>
              </html>`,
    });
    return new NextResponse(
      JSON.stringify({ message: "mail sent successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error }, { status: 500 })
    );
  }
};
