const nodemailer = require('nodemailer');

const user = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

export const mailOptions = {
  from: user,
  to: 'shahbazov.msh@gmail.com',
  subject: 'Test',
  text: 'Hello world!',
};
