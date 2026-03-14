import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
};

export const sendEmail = async (to, subject, html) => {
  const transporter = createTransporter();

  // Verify transporter on first use
  await transporter.verify();

  const mailOptions = {
    from: process.env.FROM_EMAIL || '"StellarMartBD" <noreply@stellarmartbd.com>',
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);
  return info;
};

export default sendEmail;
</xai:function_call >

<xai:function_call name="create_file">
<parameter name="absolute_path">lib/emailTemplates.js
