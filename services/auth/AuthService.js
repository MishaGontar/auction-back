import jwt from "jsonwebtoken";
import {generateCode} from "../../utils.js";
import EmailService from "../email/EmailService.js";
import {
    DELETE_VERIFICATION_CODE,
    INSERT_VERIFICATION_CODE,
    SELECT_VERIFICATION_CODE
} from "../../databaseSQL/user_code/UserCodeSqlQuery.js";
import IncorrectVerifyCodeException from "../../exceptions/IncorrectVerifyCodeException.js";

class AuthService {

    generateAccessToken(username) {
        return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn: '30d'});
    }

    generateAccessAdminToken(username) {
        return jwt.sign(username, process.env.TOKEN_ADMIN_SECRET, {expiresIn: '30d'});
    }

    async sendEmailCode(db, email, userId) {
        const code = generateCode();
        const {rows: insertedCode} = await db.query(INSERT_VERIFICATION_CODE, [code, userId]);

        if (insertedCode.length === 0) {
            throw new Error("Failed to create entry in users_codes.");
        }

        await new EmailService().sendConfirmIdentity(email, code)
    }

    async verifyCode(db, user_id, code) {
        const {rows: userCodes} = await db.query(SELECT_VERIFICATION_CODE, [user_id, code]);

        if (userCodes.length === 0) {
            throw new IncorrectVerifyCodeException();
        }

        await db.query(DELETE_VERIFICATION_CODE, [user_id, code])
        return true;
    }

}

export default new AuthService();