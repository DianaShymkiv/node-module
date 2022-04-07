import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';

import path from 'path';
import { config } from '../config';
import { emailActionEnum, emailInfo } from '../constants';

class EmailService {
  async sendMail(userMail:string, action: emailActionEnum, context = {}): Promise<SentMessageInfo> {
    const templateRenderer = new EmailTemplate({
      views: {
        // process.cwd() з будь якої точки йде на стартовий файл (app.ts) але тут в нас буде зсилатись на src а на продакшені на dist
        // root: path.join(process.cwd(), 'email-templates'),

        // @ts-ignore
        root: path.join(global.rootDir, 'email-templates'),
      },
    });

    const { subject, templateName, header } = emailInfo[action];

    Object.assign(context, { frontendUrl: config.FRONTEND_URL, header });

    const html = await templateRenderer.render(templateName, context);
    // context =  a(href = '.com' --- that link is not written by people, it is taken from environmental variables

    // const html = await templateRenderer.render(templateName, {userName: 'Kira'});
    // locals - object with dynamic variables ("userName" in welcome.pug)

    const emailTransporter = nodemailer.createTransport({
      from: 'email',
      service: 'gmail',
      auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD,

      },
    });
    return emailTransporter.sendMail({
      to: userMail,
      subject,
      html,
    });
  }
}

export const emailService = new EmailService();
