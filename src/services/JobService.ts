
import { Job } from '../models/Job';
import { Contract } from '../models/Contract';
import { Profile } from '../models/Profile';
import { Op, Transaction } from 'sequelize';

export class JobService {
  static async getUnpaidJobs(profileId: number) {
    try {
      return await Job.findAll({
        include: [
          {
            model: Contract,
            as: "Contract",
            include: [
              {
                model: Profile,
                as: 'Client'
              },
              {
                model: Profile,
                as: 'Contractor'
              }
            ]
          }
        ],
        where: {
          '$Contract.status$': "in_progress",
          [Op.and]: [
            { [Op.or]: [{ paid: null }, { paid: false }] },
            {
              [Op.or]: [
                { '$Contract.Contractor.id$': profileId },
                { '$Contract.Client.id$': profileId }
              ]
            }
          ],
        }
      });
    } catch (error) {
      throw new Error('Error fetching unpaid jobs: ');
    }
  }

  static async findJobById(jobId: number, transaction?: Transaction) {
    try {
      return await Job.findByPk(jobId, { include: { model: Contract, as: 'Contract' }, transaction });
    } catch (error) {
      throw new Error('Error fetching job: ');
    }
  }

  static async markJobAsPaid(jobId: number, paymentDate: Date, transaction: Transaction) {
    try {
      const job = await Job.findByPk(jobId, { transaction });
      if (job && !job.paid) { // Idempotency check: only mark as paid if it's not already paid
        job.paid = true;
        job.paymentDate = paymentDate;
        await job.save({ transaction });
      }
      return job;
    } catch (error) {
      throw new Error('Error marking job as paid');
    }
  }

  static async getTotalUnpaidJobs(userId: number, transaction: Transaction) {
    try {
      const jobs = await Job.findAll({
        include: {
          model: Contract,
          as: 'Contract',
          where: {
            ClientId: userId,
            status: 'in_progress'
          }
        },
        where: {
          [Op.or]: [
            { paid: { [Op.ne]: true } },
            { paid: { [Op.is]: null } }
          ]
        }, transaction
      });

      return jobs.reduce((total, job) => total + job.price, 0);
    } catch (error) {
      throw new Error('Error calculating total unpaid jobs');
    }
  }
}
