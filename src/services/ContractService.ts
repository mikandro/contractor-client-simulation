import { Contract } from '../models/Contract';
import { Op } from 'sequelize';

export class ContractService {
  static async getContractById(contractId: number, profileId: number) {
    try {
      return await Contract.findOne({
        where: {
          id: contractId,
          [Op.or]: [
            { ClientId: profileId },
            { ContractorId: profileId }
          ]
        }
      });
    } catch (error) {
      throw new Error('Error fetching contract');
    }
  }

  static async getNonTerminatedContracts(profileId: number) {
    try {
      return await Contract.findAll({
        where: {
          [Op.or]: [
            { ClientId: profileId },
            { ContractorId: profileId }
          ],
          status: {
            [Op.ne]: 'terminated'
          }
        }
      });
    } catch (error) {
      throw new Error('Error fetching contracts');
    }
  }
}
