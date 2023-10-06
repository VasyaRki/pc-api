import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';

@Injectable()
export class MailingService {
  private readonly transporter: nodemailer.Transporter;
  private readonly dir: string;

  constructor(public readonly configService: ConfigService) {
    this.dir = path.join(__dirname, 'templates');

    this.transporter = nodemailer.createTransport(
      {
        service: configService.getOrThrow('SMTP_SERVICE'),
        auth: {
          user: configService.getOrThrow('SMTP_USERNAME'),
          pass: configService.getOrThrow('SMTP_PASSWORD'),
        },
      },
      {
        from: `"No Reply" <${configService.getOrThrow('MAIL_FROM')}>`,
      },
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    context: object,
  ): Promise<void> {
    const emailTemplateSource = await path.join(
      `${this.dir}/${templateName}.hbs`,
    );

    const templateSource = await fs.readFileSync(emailTemplateSource, 'utf-8');

    const template = await handlebars.compile(templateSource);

    const html = await template(context);

    const mailOptions = {
      to,
      subject,
      html,
    };

    await this.transporter.sendMail({ ...mailOptions });
  }

  async sendPasswordResetEmail(
    emailTo: string,
    passwordResetToken: string,
  ): Promise<void> {
    await this.sendEmail(emailTo, 'Password reset request', 'password-reset', {
      passwordResetUrl: `${this.configService.getOrThrow(
        'REACT_APP_BASE_URL',
      )}/password-reset-confirm?token=${passwordResetToken}`,
    });
  }
}
