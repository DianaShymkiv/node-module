import jwt from 'jsonwebtoken';

import { config } from '../config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositories';
import { ITokenPair, IUserPayload } from '../interfaces';
import { TokenTypes } from '../enum';

class TokenService {
  public generateTokenPair(payload:IUserPayload): ITokenPair {
    const accessToken = jwt.sign(
      payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
    );
    const refreshToken = jwt.sign(
      payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveTokenDB(userId: number, refreshToken: string, accessToken: string):Promise<IToken> {
    const tokenFromDB = await tokenRepository.findTokenByUserId(userId);
    if (tokenFromDB) {
      tokenFromDB.refreshToken = refreshToken;
      tokenFromDB.accessToken = accessToken;
      return tokenRepository.createToken(tokenFromDB);
    }
    return tokenRepository.createToken({ accessToken, refreshToken, userId });
  }

  async deleteUserTokenPair(userId: number) {
    return tokenRepository.deleteByParams({ userId });
  }

  async deleteUserTokenPairByParams(searchObject: Partial<ITokenPair>) {
    return tokenRepository.deleteByParams(searchObject);
  }

  verifyToken(authToken: string, tokenType = TokenTypes.ACCESS):IUserPayload {
    let secretWord = config.SECRET_ACCESS_KEY;

    switch (tokenType) {
    case TokenTypes.REFRESH:
      secretWord = config.SECRET_REFRESH_KEY;
      break;
    case TokenTypes.ACTION:
      secretWord = config.SECRET_ACTION_KEY;
      break;
    default:
      console.log('Incorrect  token type');
    }
    return jwt.verify(authToken, secretWord as string) as IUserPayload;
  }

  public generateActionToken(payload:IUserPayload): string {
    return jwt.sign(payload, config.SECRET_ACTION_KEY, { expiresIn: config.EXPIRES_IN_ACTION });
  }
}

export const tokenService = new TokenService();
