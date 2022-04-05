import { userService } from './user.service';
import { IUser } from '../entity';
import { tokenService } from './token.service';
import { ITokenData } from '../interfaces';

class AuthService {
  public async registration(body: IUser):Promise<ITokenData> {
    const { email } = body;

    const userFromDB = await userService.getUserByEmail(email);
    if (userFromDB) {
      throw new Error(`User with this email: ${email} already exists`);
    }
    const createdUser = await userService.createUser(body); // save user to db
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
