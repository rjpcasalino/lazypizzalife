import * as nodemailer from 'nodemailer'


export async function sendEmail({ to, subject, text, html }) {
  console.log('Sending email to:', to)

  const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.AWS_SES_USER,
      pass: process.env.AWS_SES_PASS,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Jello Name" <jello@lazypizza.life>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}
