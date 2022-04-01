import { EntityRepository, getManager, Repository } from 'typeorm';

import { IToken, TokenEntity } from '../../entity';
import { ITokenRepository } from './tokenRepository.interfsce';
import { ITokenDataToSave } from '../../interfaces';

@EntityRepository(TokenEntity)
class TokenRepository extends Repository<TokenEntity> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(TokenEntity).save(token);
        // метод save через те що якщо такий токен вже існує то він просто зробить update
    }

    public findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(TokenEntity).findOne(filterObject);
    }

    // метод який дивиться чи існує вже токен у цього юзера
    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(TokenEntity).findOne({ userId });
    }

    public async deleteByParams(findObject: Partial<IToken>) {
        return getManager().getRepository(TokenEntity).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
