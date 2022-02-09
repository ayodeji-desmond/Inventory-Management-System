import {Merchant}  from '../database/models/merchant'
import uuid from 'uuid';
import { MerchantEntity } from '../model';


class MerchantDao{

    isMerchantExist(email: any){
        return Merchant.findOne({
            where: { email }
        }).then(response => {
            return response ? true : false;
        })
    }

    createMerchant(merchant: MerchantEntity){
        return Merchant.create({
            id: uuid.v4(),
            email: merchant.email,
            address: merchant.address,
            country: merchant.country,
            city: merchant.city,
            password: merchant.password
        })
    }

}

export default new MerchantDao();