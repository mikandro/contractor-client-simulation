import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response) {
  console.error('Error:', err);
  res.status(500).json({
    message: 'An unexpected error occurred'
  });
}
