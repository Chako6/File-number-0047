import { Resend } from 'resend'

export async function POST(req) {
  try {
    const { name, email, message, type } = await req.json()

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Boğaziçi Racing <onboarding@resend.dev>',
      to: 'buracing3@gmail.com',
      subject: `[${type || 'General'}] New enquiry from ${name}`,
      html: `
        <p><b>From:</b> ${name} (${email})</p>
        <p><b>Type:</b> ${type || 'General'}</p>
        <p><b>Message:</b></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 500 })
  }
}
