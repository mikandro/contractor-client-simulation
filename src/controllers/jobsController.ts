import { Request, Response } from 'express';
import { JobService } from '../services/JobService';
import { ProfileService } from '../services/ProfileService';
import { sequelize } from '../models';

export class JobsController {
  static async getUnpaidJobs(req: Request, res: Response) {
    const profileId = parseInt(req.profile.id);

    try {
      const unpaidJobs = await JobService.getUnpaidJobs(profileId);
      res.json(unpaidJobs);
    } catch (error) {
      res.status(500).send('An error occurred while fetching unpaid jobs');
    }
  }

  static async payForJob(req: Request, res: Response) {
    const profileId = parseInt(req.profile.id);
    const jobId = parseInt(req.params.job_id);

    await sequelize.transaction(async (t) => {
      const job = await JobService.findJobById(jobId, t);
      if (!job) {
        return res.status(404).send('Job not found').end();
      }

      if (job.paid) {
        return res.status(400).send('Job has already been paid').end();
      }

      const clientProfile = await ProfileService.getProfileById(profileId, t);
      if (!clientProfile || clientProfile.balance < job.price) {
        return res.status(400).send('Insufficient balance').end();
      }

      await ProfileService.updateProfileBalance(profileId, -job.price, t);
      await ProfileService.updateProfileBalance(job.Contract.ContractorId, job.price, t);
      await JobService.markJobAsPaid(jobId, new Date(), t);

      res.status(200).send('Job paid successfully');
    });
  }
}
