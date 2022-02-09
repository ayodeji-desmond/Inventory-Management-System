import express from 'express';
import { MerchantController } from "../controllers/index";
import validator, {ValidationSource} from "../helper/validator";
import schema from "../helper/validatorSchema";

const router = express.Router();

router.post("/merchant/signup", validator(schema.merchantSignup, ValidationSource.BODY), MerchantController.merchantSignup);
router.post("merchant/signin", validator(schema.merchantSignin, ValidationSource.BODY), MerchantController.merchantSignIn);

export default router;