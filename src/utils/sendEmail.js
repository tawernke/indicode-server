import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";

export async function sendEmail(to, subject, template, context) {
  const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USER,
    MAIL_PASS,
    SENDER_ADDRESS,
  } = process.env;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: MAIL_USER, // generated ethereal user
      pass: MAIL_PASS, // generated ethereal password
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".handlebars",
        layoutsDir: path.join(__dirname, "../email"),
        defaultLayout: template,
        partialsDir: path.join(__dirname, "../email"),
      },
      viewPath: path.join(__dirname, "../email"),
    })
  );

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"Flur Jewellery" <${SENDER_ADDRESS}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    // text, // plain text body
    template,
    context
  });
}

