import {Request, Response} from 'express';
import {Op} from 'sequelize';
//import {serverResponse, serverError} from "../helper/serverResponse";
//import { NextFunction } from 'connect';
import { SuccessMsgResponse } from '../helper/ApiResponse';

import {BadRequestError, ApiError, InternalError} from "../helper/ApiError"
import {} from "../helper/ApiResponse";
import merchant from "../dao/merchant";
import Error from "../helper/error";
import {Merchant} from "../database/models/merchant";
//import { STRING } from 'sequelize/dist';
import * as jwt from "jsonwebtoken";
import {apiErrorHandler} from "../helper/errorHandler"
import { serverError } from '../helper/serverResponse';
import utils from "../helper/utilities";




class MerchantController{

    async merchantSignIn(req: Request, res: Response){
        try{
            const user_login_credentials = req.body;
            let encrypted_password = utils.hashString(user_login_credentials.password);
            const userFound = await Merchant.findOne({
                where: {
                    [Op.or]: [
                        { email: user_login_credentials.email},
                        { username: user_login_credentials.username}
                    ]
                }
            });

            if(!userFound) throw new BadRequestError("User not registered");


            //Sing JWT, valid for 1 hour
            /*
            const token = jwt.sign({ 
                    id: userFound.id, 
                    email: userFound.email 
                },
                config.jwtSecret,
                { expiresIn: "1h" }
            );
            */

        }catch(err){
            console.log(err);
        }
    }

    async merchantSignup(req: Request, res: Response){

        try{
            const merchantData = req.body
            if(merchantData.password != merchantData.confirm_password) throw new BadRequestError("Kindly confirm your password")
            delete merchantData.confirm_password;
            const is_merchant_unique = await Merchant.findOne({
                where: {
                    email: merchantData.email
                },
                attributes: ['id', 'email']
            });
            if(is_merchant_unique) throw new BadRequestError("Email already exist");
            const activation_code = utils.generateRandomToken();
            let merchant_data_obj = Object.assign({}, merchantData, {
                activated: 0
            });
            const registeredMerchant = await Merchant.create(merchant_data_obj);
            return new SuccessMsgResponse("Merchant successfully registered").send(res);

        }catch(err){
            console.log(err)
            Error.sendError400(err, res);
            
        }
    }
}

export default new MerchantController();