import {DELETE_USER_BY_ID, SELECT_USER_BY_USERNAME_OR_EMAIL} from "../../databaseSQL/user/UserSqlQuery.js";

class UserService {
    async getUserByUsernameOrEmail(db, login) {
        const result = await db.query(SELECT_USER_BY_USERNAME_OR_EMAIL, [login]);
        return result.rows[0];
    }

    async deleteUserById(db, id) {
        if (!id) {
            throw new Error('Missing id');
        }
        const result = await db.query(DELETE_USER_BY_ID, [id]);
        return result.rows[0];
    }
}

export default new UserService();