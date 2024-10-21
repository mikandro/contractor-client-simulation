import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../models';
import { Profile } from './Profile';

export class Contract extends Model {
  public id!: number;
  public terms!: string;
  public status!: 'new' | 'in_progress' | 'terminated';
  public ClientId!: number;
  public ContractorId!: number;
}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'terminated'),
      allowNull: false
    },
    ClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Profile,
        key: 'id'
      }
    },
    ContractorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Profile,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Contract'
  }
);

Profile.hasMany(Contract, { foreignKey: 'ClientId' });
Profile.hasMany(Contract, { foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'ContractorId' });
