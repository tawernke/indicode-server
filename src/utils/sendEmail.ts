import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { Order } from "src/entities/Order";
import moment from "moment";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, subject: string, template: string, order: Order) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("test account", testAccount)

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



  // hbs.registerHelper('format_date', )

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".handlebars",
        layoutsDir: path.join(__dirname, "../email"),
        defaultLayout: "customer-confirm-order",
        partialsDir: path.join(__dirname, "../email"),
      },
      viewPath: path.join(__dirname, "../email"),
    })
  );

  console.log(order)
  const orderDate = moment(order.createdAt).format("MMMM DD, YYYY");
  const orderDetails = {
    ...order,
    formattedDate: orderDate
  }
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Flur Jewellery" <${SENDER_ADDRESS}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    // text, // plain text body
    template,
    context: {
      order: orderDetails
    }
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

