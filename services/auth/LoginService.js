import UserService from "../user/UserService.js";
import LoginFailedException from "../../exceptions/LoginFailedException.js";
import bcrypt from "bcrypt";
import {UPDATE_USER_ACTIVATION_STATUS} from "../../databaseSQL/user/UserSqlQuery.js";
import CannotActivateAccountException from "../../exceptions/CannotActivateAccountException.js";

class LoginService {
    async handleLogin(db, {login, password}) {
        const user = await UserService.getUserByUsernameOrEmail(db, login);
        if (!user) {
            throw new LoginFailedException();
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new LoginFailedException();
        }

        return user;
    }

    async activateAccount(db, login) {
        try {
            const user = await UserService.getUserByUsernameOrEmail(db, login);
            let newUser = await db.query(UPDATE_USER_ACTIVATION_STATUS, [true, user.user_id]);
            return newUser.rows[0];
        } catch (e) {
            console.error("activateAccount error", e)
            throw new CannotActivateAccountException();
        }
    }
}

export default new LoginService()