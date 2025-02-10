import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  const { email, verification_code } = await req.json();

  const transporter = nodemailer.createTransport(
    {
      // service: "gmail",
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    },
    {
      from: `Firstrustfinance <${process.env.EMAIL}>`,
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
                  <p>Below is your one time passcode that you need to complete your authentication. Please do not share the code with anyone</p>
                  <p style="font-size:18px;font-weight:bold;text-align:center;background:#F7F7F7";padding-top:20px;padding-bottom:20px;>${verification_code}</p>
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
