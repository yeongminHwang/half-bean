const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  host: "smtp.gmlail.com",
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL, // 보내는 메일의 주소
    pass: process.env.NODEMAILER_PASSWORD, // 보내는 메일의 비밀번호
  },
});

module.exports = { transporter };
