import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.LOGIN]: {
        subject: 'Welcome',
        html: 'You are logged in',
    },

    [emailActionEnum.ACCOUNT_DELETED]: {
        subject: 'Opps...',
        html: 'Your account has been blocked',
    },

    [emailActionEnum.PASSWORD_CHANGED]: {
        subject: 'Change password',
        html: 'Your password has been successfully changed',
    },
    [emailActionEnum.REGISTRATION]: {
        subject: 'Welcome',
        html: 'You have been successfully registered',
    },
};
