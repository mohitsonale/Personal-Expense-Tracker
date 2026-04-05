import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host:"smtp-relay.brevo.com",
  port:587,
  secure:false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
   tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY ✅");
  }
});
console.log(process.env.SMTP_USER);
console.log(process.env.SMTP_PASS);
export default transporter;
