import {SELECT_USER_BY_USERNAME_OR_EMAIL, SELECT_USER_ID_BY_EMAIL} from "../../databaseSQL/user/UserSqlQuery.js";

class UserService {
    async getUserByUsernameOrEmail(db, login) {
        const result = await db.query(SELECT_USER_BY_USERNAME_OR_EMAIL, [login]);
        return result.rows[0];
    }
}

export default new UserService();