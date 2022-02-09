import { Model, DataTypes} from 'sequelize';
import sequelize from './index'
import service from "../../services/bcrypt.service"

  export class Merchant extends Model {

    public email!: string
    public address!: string
    public country!: string
    public city!: string
    public password!: string
    
    //static associate(models) {}

   
  };

  const hooks = {
    beforeCreate(merchant: Merchant){
      merchant.password = service.password(merchant);
    }
  };

  Merchant.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
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
    hooks
  });
