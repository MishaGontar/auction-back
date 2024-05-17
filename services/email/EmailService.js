import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import {
    EMAIL_CONFIRM_HTML_MSG,
    EMAIL_CONFIRM_SUBJECT_MSG,
    EMAIL_CONG_MSG,
    EMAIL_CONG_MSG2,
    EMAIL_CONG_OUTRO_MSG,
    EMAIL_REJECT_SELLER_HEADER,
    EMAIL_REJECT_SELLER_HTML,
    EMAIL_SUBJECT_CONGRATULATIONS_SELLER
} from "../../TextConstant.js";

class EmailService {
    constructor() {
        const config = {
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_APP_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        }
        this.transporter = nodemailer.createTransport(config);
        this.MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: process.env.PRODUCT_NAME,
                link: process.env.PRODUCT_LINK
            }
        });
    }

    async sendAcceptSellerMessage(name, email) {
        const response = {
            body: {
                name: name,
                intro: EMAIL_CONG_MSG + EMAIL_CONG_MSG2,
                outro: EMAIL_CONG_OUTRO_MSG
            }
        };

        const message = {
            from: process.env.GMAIL_APP_EMAIL,
            to: email,
            subject: EMAIL_SUBJECT_CONGRATULATIONS_SELLER,
            html: this.MailGenerator.generate(response),
        };

        return this.transporter.sendMail(message)
    }

    async sendConfirmIdentity(email, code) {
        const message = {
            from: process.env.GMAIL_APP_EMAIL,
            to: email,
            subject: `${EMAIL_CONFIRM_SUBJECT_MSG} ${process.env.PRODUCT_NAME}`,
            html: `<p>${EMAIL_CONFIRM_HTML_MSG}<br/><strong >${code}</strong></p>`,
        };
        return this.transporter.sendMail(message)
    }

    async sendRejectSellerMessage(email) {
        const message = {
            from: process.env.GMAIL_APP_EMAIL,
            to: email,
            subject: `${EMAIL_REJECT_SELLER_HEADER} ${process.env.PRODUCT_NAME}`,
            html: EMAIL_REJECT_SELLER_HTML,
        };
        return this.transporter.sendMail(message)
    }
}

export default EmailService;