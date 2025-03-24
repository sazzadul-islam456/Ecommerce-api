const nodemailer = require("nodemailer");
require("dotenv").config();  

async function emailVerification(email, otp) {
  try {
    console.log("Sending OTP:", otp);  

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Jhakanaka Shop 👻" <${process.env.EMAIL_USER}>`,  
      to: email,  
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,  
      html: `<b>Jhakanaka Shop is an e-commerce shop. Here is your OTP: ${otp}</b>`,  
    });

   
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

module.exports = emailVerification;
