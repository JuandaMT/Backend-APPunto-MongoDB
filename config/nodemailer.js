const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {
        user: "nodemailer.bridge@gmail.com",

        pass: "vwkdjmqrocqwbbqf",
    },
});

module.exports = transporter;
