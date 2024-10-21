import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models/Profile';
import { User } from '../models/User';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const profileId = req.header('profile_id');

  if (!profileId) {
    res.status(403).json({ message: 'Unauthorized: Missing profile_id' }).end();
  }

  Profile.findByPk(parseInt(profileId as string))
    .then(profile => {
      if (!profile) {
        return res.status(403).json({ message: 'Unauthorized: Invalid profile_id' }).end();
      }

      req.profile = profile;
      next();
    })
    .catch(err => {
      console.error('Error in authMiddleware:', err);
      res.status(500).json({ message: 'Internal server error' });
      next(err)
    });
}

export async function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.header('user_id');

  if (!userId) {
    res.status(403).json({ message: 'Unauthorized: Missing user_id' }).end();
  }

  User.findByPk(parseInt(userId as string))
    .then(user => {
      if (!user) {
        return res.status(403).json({ message: 'Unauthorized: Invalid user_id' }).end();
      }

      req.user = user;
      next();
    })
    .catch(err => {
      console.error('Error in authMiddleware:', err);
      res.status(500).json({ message: 'Internal server error' });
      next(err)
    });
}
