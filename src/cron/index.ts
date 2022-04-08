import { getNewUsers } from './get-new-users';

export const cronRun = () => {
  console.log('CRON WAS STARTED');
  getNewUsers();
};
