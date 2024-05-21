import {getErrorResponse, getUserFromRequest} from "../../utils.js";
import LotBetService from "../../services/lot/LotBetService.js";
import UserService from "../../services/user/UserService.js";
import AuctionService from "../../services/auction/AuctionService.js";

class UserController {
    getUser(req, res) {
        try {
            const {user} = req;
            delete user.password;
            return res.status(200).send(user)
        } catch (e) {
            console.log("Error during getUsername ", e)
            return res.status(400).send({message: 'Не змогли отримати користувача'})
        }
    }

    async getUserBets(req, res) {
        const {user} = getUserFromRequest(req)
        try {
            const bets = await LotBetService.getBetsForUser(req.db, user.user_id)
            res.status(200).send({bets: bets || null})
        } catch (e) {
            console.error(`getUserBets error: `, e)
            return getErrorResponse(res, e)
        }
    }

    async deleteUserById(req, res) {
        const {user_id, seller_id} = req.user;
        try {
            if (seller_id) {
                const auctions = await AuctionService.getAuctionsBySellerId(req.db, seller_id);
                for (const auction of auctions) {
                    await AuctionService.deleteAuction(req.db, auction)
                }
            }
            const user = await UserService.deleteUserById(req.db, user_id)
            return res.status(200).send({message: 'Користувач видалився', user: user})
        } catch (e) {
            console.error(`deleteUserById `, e)
            return getErrorResponse(res, e)
        }
    }
}

export default new UserController()