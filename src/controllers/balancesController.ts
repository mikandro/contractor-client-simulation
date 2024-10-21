import { Request, Response } from 'express';
import { ProfileService } from '../services/ProfileService';
import { JobService } from '../services/JobService';
import { sequelize } from '../models';

export class BalancesController {
  static async deposit(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const amount = parseFloat(req.body.amount);

    await sequelize.transaction(async (t) => {
      const totalUnpaidJobs = await JobService.getTotalUnpaidJobs(userId, t);
      const depositLimit = totalUnpaidJobs * 0.25;

      if (amount > depositLimit) {
        res.status(400).send('Deposit exceeds the allowed limit').end();
        return;
      }

      await ProfileService.updateProfileBalance(userId, amount, t);
      res.status(200).send('Deposit successful');
    });
  }
}
