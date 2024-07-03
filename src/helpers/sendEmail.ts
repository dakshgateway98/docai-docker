import nodemailer, { Transporter } from 'nodemailer';
import { AppError } from '.';
import { ERROR_CODE, ERROR_MESSAGE } from './constants';

const createTransporter = (): Transporter => {
    return nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
};

const mailFunc = async (to : string, data : string, subject : string, from : string = 'bkundu53@gmail.com') => {
    const transporter = createTransporter();
    const mailOptions = {
        from : `"DocAi <${from}>`,
        to, 
        subject,
        html: data
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } 
    catch (error) {
        console.error('Error sending email:', error);
        throw new AppError(ERROR_MESSAGE.SEND_EMAIL_FAILURE, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export default mailFunc;
