import { EntityRepository, getManager, Repository } from 'typeorm';

import { ActionToken, IActionToken, IActionTokenForSave } from '../../entity';
import { IActionTokenRepository } from './actionTokenRepository.interface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
  public async createActionToken(token: IActionTokenForSave): Promise<ActionToken> {
    return getManager().getRepository(ActionToken).save(token);
  }

  public async findByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined> {
    return getManager().getRepository(ActionToken).findOne(filterObject);
  }

  public async deleteByParams(findObject: Partial<IActionToken>) {
    return getManager().getRepository(ActionToken).delete(findObject);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
