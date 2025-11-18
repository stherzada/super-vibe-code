import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    await db.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name} `,
      html: `
  < !DOCTYPE html >
    <html>
    <head>
    <style>
    body {
  font - family: 'Arial', sans - serif;
  line - height: 1.6;
  color: #333;
  max - width: 600px;
  margin: 0 auto;
  padding: 20px;
}
              .header {
  background: linear - gradient(135deg, #667eea 0 %, #764ba2 100 %);
  color: white;
  padding: 30px;
  border - radius: 10px 10px 0 0;
  text - align: center;
}
              .content {
  background: #f9f9f9;
  padding: 30px;
  border - radius: 0 0 10px 10px;
}
              .field {
  margin - bottom: 20px;
}
              .label {
  font - weight: bold;
  color: #667eea;
  margin - bottom: 5px;
}
              .value {
  background: white;
  padding: 15px;
  border - radius: 5px;
  border - left: 4px solid #667eea;
}
              .footer {
  text - align: center;
  margin - top: 20px;
  color: #666;
  font - size: 12px;
}
</style>
  </head>
  < body >
  <div class="header" >
    <h1>📬 New Contact Form Submission </h1>
      </div>
      < div class="content" >
        <div class="field" >
          <div class="label" > From: </div>
            < div class="value" > ${name} </div>
              </div>
              < div class="field" >
                <div class="label" > Email: </div>
                  < div class="value" > <a href="mailto:${email}" > ${email} </a></div >
                    </div>
                    < div class="field" >
                      <div class="label" > Message: </div>
                        < div class="value" > ${message.replace(/\n/g, '<br>')} </div>
                          </div>
                          </div>
                          < div class="footer" >
                            <p>Sent from your portfolio contact form </p>
                              </div>
                              </body>
                              </html>
                                `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
