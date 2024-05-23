import {
    DELETE_USER_BY_ID,
    SELECT_ALL_USERS,
    SELECT_USER_BY_ID,
    SELECT_USER_BY_USERNAME_OR_EMAIL,
    UPDATE_USER_PHOTO
} from "../../databaseSQL/user/UserSqlQuery.js";
import Error400 from "../../exceptions/Error400.js";
import {getRowsOrThrowException} from "../../utils.js";
import ImageService from "../image/ImageService.js";

class UserService {
    async getUserByUsernameOrEmail(db, login) {
        const result = await db.query(SELECT_USER_BY_USERNAME_OR_EMAIL, [login]);
        return result.rows[0];
    }

    async getAllUsers(db) {
        const result = await db.query(SELECT_ALL_USERS);
        return result.rows;
    }

    async deleteUserById(db, id) {
        if (!id) {
            throw new Error400();
        }
        const result = await db.query(DELETE_USER_BY_ID, [id]);
        return result.rows[0];
    }

    async updatePhoto(db, {user_id, image_id}) {
        if (!user_id || !image_id) {
            throw new Error400();
        }
        const result_user = await db.query(SELECT_USER_BY_ID, [user_id]);
        const user = getRowsOrThrowException(result_user, "Не змогли знайти користувача")[0];

        const result = await db.query(UPDATE_USER_PHOTO, [image_id, user_id]);
        const new_user = getRowsOrThrowException(result, "Не змогли оновити фото користувача")[0]
        if (user.image_id !== 1) {
            console.warn("Need to delete old avatar");
            await ImageService.deleteImageById(db, user.image_id);
        } else {
            console.log("It`s standard avatar");
        }
        return new_user;
    }
}

export default new UserService();