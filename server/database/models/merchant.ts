import { Model, DataTypes} from 'sequelize';
import sequelize from './index'

  export class Merchant extends Model {

    public id!: string
    public email!: string
    public address!: string
    public country!: string
    public city!: string
    public password!: string
    
    //static associate(models) {}
  };

  Merchant.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: true,
      unique: true
    },
    address: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'merchant',
  });
