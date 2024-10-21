import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/AdminService';

export class AdminController {
  static async authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const isAdmin = req.user?.isAdmin;
    if (!isAdmin) {
      res.status(403).send('Unauthorized: Admin access required').end();
      return;
    }
    next();
  }

  static async getBestProfession(req: Request, res: Response) {
    const { start, end } = req.query;

    const result = await AdminService.getBestProfession(start as string, end as string);
    if (!result) {
      res.status(404).send('No data found for the given date range').end();
      return;
    }

    res.json(result);
  }

  static async getBestClients(req: Request, res: Response) {
    const { start, end, limit = 2 } = req.query;

    const clients = await AdminService.getBestClients(start as string, end as string, parseInt(limit as string));
    if (clients.length === 0) {
      res.status(404).send('No data found for the given date range').end();
      return;
    }

    res.json(clients);
  }
}
