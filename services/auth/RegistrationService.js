import {INSERT_NEW_USER, SELECT_USER_BY_USERNAME_OR_EMAIL_WITH_EMAIL} from "../../databaseSQL/user/UserSqlQuery.js";
import RegistrationFailedException from "../../exceptions/RegistrationFailedException.js";
import bcrypt from "bcrypt";

class RegistrationService {
    async handleRegistrationUser(db, {username, email, password}) {
        const result = await db.query(SELECT_USER_BY_USERNAME_OR_EMAIL_WITH_EMAIL, [username, email]);
        let user = result.rows[0];

        if (user) {
            throw new RegistrationFailedException();
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.AUTH_SALT_ROUND);

        const newUser = await db.query(INSERT_NEW_USER, [username, email, hashedPassword]);
        user = newUser.rows[0]
        return user;
    }
}

export default new RegistrationService()