import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";

export async function sendEmail(to, subject, template, context) {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    SENDER_ADDRESS,
    GOOGLE_ACCESS_TOKEN
  } = process.env;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: 'OAuth2',
      user: "flurjewellery@gmail.com", // Your gmail address.
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: GOOGLE_ACCESS_TOKEN,
      expires: 3599
    }
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
  try {
    await transporter.sendMail({
      from: `"Flur Jewellery" <${SENDER_ADDRESS}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      // text, // plain text body
      template,
      context
    });
  } catch (err) {
    console.log(err)
  }
}

