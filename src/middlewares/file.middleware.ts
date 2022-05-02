import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { constants } from '../constants';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error';

class FileMiddleware {
  async checkUserAvatar(req:IRequestExtended, res:Response, next:NextFunction) {
    try {
      console.log(req.files);

      if (!req.files?.avatar) {
        next();
        return;
      }

      const { name, size, mimetype } = req.files?.avatar as UploadedFile;

      if (size > constants.PHOTO_MAX_SIZE) {
        next(new ErrorHandler(`File ${name} is too big`));
        return;
      }

      if (!constants.PHOTOS_MIMETYPES.includes(mimetype)) {
        next(new ErrorHandler('Wrong file format'));
        return;
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
