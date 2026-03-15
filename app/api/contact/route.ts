import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email, subject, message } = await req.json();

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,          // sends to yourself
            replyTo: email,                       // reply goes back to sender
            subject: `[Portfolio] ${subject}`,
            html: `
                <div style="font-family: monospace; background: #0b0f1e; color: #e0e0e0; padding: 24px; border-radius: 8px;">
                    <h2 style="color: #00e5ff; margin-bottom: 16px;">📨 New Portfolio Message</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="color: #00e5ff; padding: 8px 16px 8px 0; white-space: nowrap;">FROM</td>
                            <td style="color: #e0e0e0; padding: 8px 0;">${email}</td>
                        </tr>
                        <tr>
                            <td style="color: #00e5ff; padding: 8px 16px 8px 0; white-space: nowrap;">SUBJECT</td>
                            <td style="color: #e0e0e0; padding: 8px 0;">${subject}</td>
                        </tr>
                    </table>
                    <hr style="border-color: rgba(0,229,255,0.15); margin: 16px 0;" />
                    <p style="color: #00e5ff; margin-bottom: 8px;">MESSAGE</p>
                    <p style="color: #e0e0e0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Email send error:', err);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}
