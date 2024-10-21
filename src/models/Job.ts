
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../models';
import { Contract } from './Contract';

export class Job extends Model {
  public id!: number;
  public description!: string;
  public price!: number; // TODO Rounding operations for floats might not return as expected. Must be string
  public paid!: boolean;
  public paymentDate!: Date;
  public ContractId!: number;
  public Contract!: Contract;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL, // TODO Won't work in JP, there are 4 precision numbers
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paymentDate: {
      type: DataTypes.DATE
    },
    ContractId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Contract,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Job'
  }
);

Contract.hasMany(Job, { foreignKey: 'ContractId' });
Job.belongsTo(Contract, { as: 'Contract', foreignKey: 'ContractId' });
