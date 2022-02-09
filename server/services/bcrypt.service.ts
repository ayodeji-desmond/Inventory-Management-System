import * as bcrypt from 'bcrypt';

const password = (merchant: any) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(merchant.password, salt);
    return hash;
};

const comparePassword = (pw: any, hash: any) => (
    bcrypt.compareSync(pw, hash)
);
  
export default {    
    password,
    comparePassword,
}