import { Request, Response } from 'express';
import { ContractService } from '../services/ContractService';

export class ContractsController {
  static async getContractById(req: Request, res: Response) {
    const profileId = parseInt(req.profile.id);
    const contractId = parseInt(req.params.id);

    const contract = await ContractService.getContractById(contractId, profileId);
    if (!contract) {
      res.status(404).send('Contract not found').end();
      return;
    }
    res.json(contract);
  }

  static async getAllNonTerminatedContracts(req: Request, res: Response) {
    const profileId = parseInt(req.profile.id);

    try {
      const contracts = await ContractService.getNonTerminatedContracts(profileId);
      res.json(contracts);
    } catch (error) {
      res.status(500).send('An error occurred while fetching contracts');
    }
  }
}
