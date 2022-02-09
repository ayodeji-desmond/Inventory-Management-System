import * as bcrypt from 'bcrypt';
const saltRounds = 10;

const generateRandomToken = () => {
    return Math.floor(Math.random()*90000) + 100000;
}

const hashString = (text: any) => {
    return bcrypt.hashSync(text, saltRounds);
}

export default {
    generateRandomToken,
    hashString
}