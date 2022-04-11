import { IUser } from '../entity';
import { tokenService } from './token.service';
import { ITokenData } from '../interfaces';

class AuthService {
  public async registration(createdUser: IUser):Promise<ITokenData> {
    return this._getTokenData(createdUser);
  }

  private async _getTokenData(userData: IUser):Promise<ITokenData> {
    const { id, email } = userData;
    const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
    // create refresh and access tokens
    await tokenService.saveTokenDB(id, tokensPair.refreshToken, tokensPair.accessToken);

    return {
      ...tokensPair,
      userId: id,
      userEmail: email,
    };
  }
}

export const authService = new AuthService();
