import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "../../" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rahadit.a.p123@gmail.com",
    pass: "bjbs uqny ixdf tdfa",
  },
});

const sendVerificationCode = async ({ code, to }) => {
  console.log(to);
  try {
    const result = await transporter.sendMail({
      to : to,
      subject: "GadgetLab Verification Code",
      html: `<p>The Verification Code is ${code}</p>`,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  sendVerificationCode,
};
