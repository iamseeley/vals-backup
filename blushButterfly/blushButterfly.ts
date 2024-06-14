import { runBackupIfChanged } from 'https://esm.town/v/iamseeley/valBackup';

export default async function (interval: Interval) {
  await runBackupIfChanged();
}