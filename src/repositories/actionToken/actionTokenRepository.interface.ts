import { IActionToken } from '../../entity';

export interface IActionTokenRepository {
    createActionToken(token: IActionToken): Promise<IActionToken>;

    findByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined>;
}
