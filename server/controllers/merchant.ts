import {Request, Response} from 'express';
//import {serverResponse, serverError} from "../helper/serverResponse";
//import { NextFunction } from 'connect';
import {BadRequestError} from "../helper/ApiError"
import merchant from "../dao/merchant";
import bcrypt from 'bcrypt';
import {Merchant} from "../database/models/merchant";
//import { STRING } from 'sequelize/dist';
import * as jwt from "jsonwebtoken";

const dotenv = require("dotenv");
const appPath = require("app-root-path");
dotenv.config({ path: `${appPath}/.env` });



class MerchantController{

    async merchantSignIn(req: Request, res: Response){
        try{
            const user_login_credentials = req.body;
            let encrypted_password = await bcrypt.hash(user_login_credentials.password, process.env.SALT!);
            const userFound = await Merchant.findOne({
                where: {
                    email: user_login_credentials.email,
                    password: encrypted_password
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

        }
    }

    async merchantSignup(req: Request, res: Response){
        try{
            const merchantData = req.body
            if(merchantData.password != merchantData.confirm_password) throw new BadRequestError("Kindly confirm your password")
            delete merchantData.confirm_password;
            const is_merchant_exist = await merchant.isMerchantExist(merchantData.email);
            if(is_merchant_exist) throw new BadRequestError("Email already exist");
            merchantData.password = await bcrypt.hash(merchantData.password, process.env.SALT!);
            console.log(merchantData)

            //const result = await merchant.createMerchant(merchantData);
        }catch(err){
            res.json({err});
        }
    
    }
}

export default new MerchantController();