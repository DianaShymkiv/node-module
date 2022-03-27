import { getManager } from 'typeorm';
import { IToken, Token } from '../../entity/token';

class TokenRepository {
    public async createToken(token: any): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
        // метод save через те що якщо такий токен вже існує то він просто зробить update
    }

    // метод який дивиться чи існує вже токен у цього юзера
    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
