import uuid from 'uuid';
import {UserEntity} from '../model';
import {User}  from '../database/models/user'


class UserModel{
    
    findByEmail(email: boolean){
        return User.findOne({ where: { email } })
    }

    createUser(user: UserEntity){
        return User.create({
            id: uuid.v4(),
            username: user.username,
            email: user.email,
            password: user.password
        })
    }
}
export default new UserModel();
