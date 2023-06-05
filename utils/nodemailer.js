const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = "1//040V4P_V5jwB-CgYIARAAGAQSNwF-L9IrhRLnXVW88WIob8oc1QKcsMOsoDlKcUuxXBLOs6TWECSueIMrSiCpipsRG-XvtoQ007w";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";

const oAuthPass = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oAuthPass.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (user, email, otp) => {
    try {
        const createToken = await oAuthPass.getAccessToken();

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

        const buildFile = path.join(__dirname, "../views/index.ejs");
        const data = await ejs.renderFile(buildFile, {
            name: user,
            otp: otp,
        });

        const mailOptions = {
            from: "Cross-Africa",
            to: email,
            subject: "Verification OTP",
            html: data,

        };
        const result = transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};
const orderMail = async (email, name, order_No, user_email, user_name, total) => {
    try {
        const createToken = await oAuthPass.getAccessToken();

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

        const buildFile = path.join(__dirname, "../views/index.ejs");
        const data = await ejs.renderFile(buildFile, {
            name: name,
            order_No: order_No,
            user_email: user_email,
            user_name: user_name,
            total: total
        });

        const mailOptions = {
            from: "Cross-Africa",
            to: email,
            subject: "Verification OTP",
            html: data,

        };
        const result = transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    sendMail,
    orderMail
};