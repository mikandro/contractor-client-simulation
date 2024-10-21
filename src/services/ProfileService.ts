import { Profile } from '../models/Profile';
import { Transaction } from 'sequelize';

export class ProfileService {
  static async getProfileById(profileId: number, transaction?: Transaction) {
    try {
      return await Profile.findByPk(profileId, { transaction });
    } catch (error) {
      throw new Error('Error fetching profile');
    }
  }

  static async updateProfileBalance(profileId: number, amount: number, transaction?: Transaction) {
    try {
      const profile = await Profile.findByPk(profileId);
      if (profile) {
        profile.balance += amount;
        await profile.save({ transaction });
      }
      return profile;
    } catch (error) {
      throw new Error('Error updating profile balance');
    }
  }
}
