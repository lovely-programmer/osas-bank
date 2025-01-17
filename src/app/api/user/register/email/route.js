import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  const { email, name, account_number, password } = await req.json();

  const transporter = nodemailer.createTransport(
    {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    },
    {
      from: "Firstrustfinance <olaoluwaolasunkanmi5@gmail.com>",
    }
  );

  const mailOptions = {
    from: `Firstrustfinance <${process.env.EMAIL}>`,
    to: email,
  };

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: "Your email verification code",
      html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family:Arial,Helvetica,sans-serif";padding-left:20px;padding-right:20px;line-height:25px;>
                  <p>Dear ${name} !</p>
                  <p style="margin-bottom: 20px;">You have successfully opened an account in Firstrustfinance!</p>
                  <h3>Your access to your account</h3>
                  <span style="display: block; padding-bottom: 10px;">Account Number: ${account_number}</span>
                  <span>Password: ${password}</span>
                 <p style="margin-top:20px"><b>ATTENTION!</b> In order to prevent third parties from access your account we recommend you to keep your personal data in a safe place and delete this email from your mailbox. </p>
                  <p>If you are having any issues with account, please don't hesitate to contact us </p>
                  <p>Thankyou for choosing Firstrustfinance, Best regards</p>
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
