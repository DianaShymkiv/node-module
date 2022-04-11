export const constants = {
  AUTHIRIZATION: 'Authorization',

  EMAIL_REGEXP: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  PHONE_REGEXP: /^[0-9]+$/,
  PASSWORD_REGEXP: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#^])[0-9A-Za-z#@$!%*?&]{8,}/,

  PHOTO_MAX_SIZE: 2 * 1024 * 1024,
  VIDEO_MAX_SIZE: 20 * 1024 * 1024,

  PHOTOS_MIMETYPES: [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/webp',
  ],

  VIDEO_MIMETYPES: [
    'video/mp4',
    'video/x-mvideo',
  ],

};
