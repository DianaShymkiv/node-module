import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositories';
import { ITokenPair, IUserPayload } from '../interfaces';

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

    verifyToken(authToken: string, tokenType = 'access'):IUserPayload {
        // перевіряємо токен, по дефолту tokenType = access то розкодовуємо за SECRET_ACCESS_KEY
        // ,але якщо tokenType = refresh то за рефреш
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
