import nodemailer, { createTestAccount } from 'nodemailer'
import config from './index'
let transporter = nodemailer.createTransport({
    host:config.SMTP_MAIL_HOST,
    port : config.SMTP_MAIL_PORT,
    secure :false,
    auth : {
        User : config.SMTP_MAIL_USERNAME,
        pass : config.SMTP_MAIL_PASSWORD
    },
});