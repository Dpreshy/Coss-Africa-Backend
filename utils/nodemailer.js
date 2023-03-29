const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
const ejs = require("ejs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = "1//04tJ8CVDDrJ3KCgYIARAAGAQSNwF-L9Ir0HQZX0IbQMSrgAEkNBI9NzJWqMHHpJEUAl_08rQKXljsqLqCf1CtIqpn3Gfp_qvWUMs";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";

const oAuthPass = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oAuthPass.setCredentials({ refresh_token: REFRESH_TOKEN });

const getToken = crypto.randomBytes(32).toString("hex");
const token = jwt.sign({ getToken }, process.env.TOKEN_SECRET, { expiresIn: "3d" });

const sendMail = async (user, email, otp) => {
    try {
        const createToken = await oAuthPass.getAccessToken();

        // const getToken = crypto.randomBytes(32).toString("hex");
        // const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

        const transport = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GMAIL_USERNAME,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                accessToken: createToken.token,
            },
        });

        const buildFile = path.join(__dirname, "../views/resetPassword.ejs");
        const data = await ejs.renderFile(buildFile, {
            name: user,
            otp: otp,
        });

        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: "Reset Password",
            html: data,

        };


        const result = transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = sendMail;