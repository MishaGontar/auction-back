import {getErrorResponse, getUserFromRequest} from "../../utils.js";
import LotBetService from "../../services/lot/LotBetService.js";

class UserController {
    getUser(req, res) {
        try {
            const {user} = req;
            delete user.password;
            return res.status(200).send(user)
        } catch (e) {
            console.log("Error during getUsername ", e)
            return res.status(400).send({message: 'Can`t find username'})
        }
    }

    async getUserBets(req, res) {
        const {user} = getUserFromRequest(req)
        try {
            const bets = await LotBetService.getBetsForUser(req.db, user.user_id)
            if (!bets) {
                return res.status(200).send({message: 'No bets found.'})
            }
            res.status(200).send(bets)
        } catch (e) {
            console.error(`getUserBets error: `, e)
            return getErrorResponse(res, e)
        }
    }
}

export default new UserController()