import { DataTypes, Model } from 'sequelize';
import sequelize from './index'

export class User extends Model{
  public id!: string
  public username!: string
  public email!: string
}

User.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'User',
  createdAt: false,
  updatedAt: false
});
