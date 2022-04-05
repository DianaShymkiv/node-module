import { emailActionEnum } from './enums';

export const emailInfo = {
  [emailActionEnum.LOGIN]: {
    subject: 'Welcome',
    templateName: 'login',
    header: 'You are logged in',
  },

  [emailActionEnum.ACCOUNT_DELETED]: {
    subject: 'Opps...',
    templateName: 'deleted',
    header: 'Your account has been blocked',
  },

  [emailActionEnum.PASSWORD_CHANGED]: {
    subject: 'Change password',
    templateName: 'password_changed',
    header: 'Your password has been successfully changed',
  },
  [emailActionEnum.REGISTRATION]: {
    subject: 'Registration',
    templateName: 'welcome',
    header: 'You have been successfully registered',
  },
};
