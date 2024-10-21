import { Profile } from '../models/Profile';
import { Contract } from '../models/Contract';
import { Job } from '../models/Job';
import { sequelize } from '../models';
import { Op } from 'sequelize';

export class AdminService {
  static async getBestProfession(start: string, end: string) {
    try {
      const result = await Job.findAll({
        where: {
          paid: true,
          paymentDate: {
            [Op.between]: [new Date(start), new Date(end)]
          }
        },
        include: [
          {
            model: Contract,
            as: 'Contract',
            include: [
              { model: Profile, as: 'Contractor', attributes: [] }
            ],
            attributes: []
          }
        ],
        attributes: [
          [sequelize.fn('sum', sequelize.col('price')), 'total'],
          [sequelize.col('Contract.Contractor.profession'), 'profession']
        ],
        group: [sequelize.col('Contract.Contractor.profession')],
        order: [[sequelize.literal('total'), 'DESC']],
        limit: 1
      });

      return result[0];
    } catch (error) {
      throw new Error('Error fetching best profession');
    }
  }

  static async getBestClients(start: string, end: string, limit: number = 2) {
    try {
      const clients = await Job.findAll({
        where: {
          paid: true,
          paymentDate: {
            [Op.between]: [new Date(start), new Date(end)]
          }
        },
        include: [
          {
            model: Contract,
            as: 'Contract',
            include: [
              { model: Profile, as: 'Client', attributes: [] }
            ],
            attributes: []
          }
        ],
        order: [
          ['price', 'DESC']
        ],
        attributes: [
          [sequelize.col('Job.id'), "id"], [sequelize.col('Contract.Client.firstName'), 'firstName'], [sequelize.col('Contract.Client.lastName'), 'lastName'], 'price'
        ],
        limit: limit ? limit : 2
      })

      return clients;
    } catch (error) {
      throw new Error('Error fetching best clients');
    }
  }
}
