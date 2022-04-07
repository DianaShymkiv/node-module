import { EntityRepository, getManager, Repository } from 'typeorm';

import { IToken, Token } from '../../entity';
import { ITokenRepository } from './tokenRepository.interface';
import { ITokenDataToSave } from '../../interfaces';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
  public async createToken(token: ITokenDataToSave): Promise<IToken> {
    return getManager().getRepository(Token).save(token);
    // метод save через те що якщо такий токен вже існує то він просто зробить update
  }

  public findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
    return getManager().getRepository(Token).findOne(filterObject);
  }

  // метод який дивиться чи існує вже токен у цього юзера
  public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
    return getManager().getRepository(Token).findOne({ userId });
  }

  public async deleteByParams(findObject: Partial<IToken>) {
    return getManager().getRepository(Token).delete(findObject);
  }
}

export const tokenRepository = new TokenRepository();
