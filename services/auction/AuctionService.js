import {
    DELETE_AUCTION_BY_ID,
    INSERT_AUCTION,
    SELECT_ALL_AUCTION,
    SELECT_ALL_AUCTION_STATUS,
    SELECT_AUCTION_BY_ID,
    SELECT_AUCTION_BY_SELLER_ID,
    SELECT_ONLY_AUCTION_CREATE_STATUS,
    UPDATE_AUCTION_BY_ID,
    UPDATE_AUCTION_BY_ID_WITHOUT_IMG
} from "../../databaseSQL/auction/AuctionSqlQuery.js";
import {getRowsOrThrowException} from "../../utils.js";

class AuctionService {
    async createAuction(db, formData) {
        const {name, description, seller_id, status_id, img_id} = formData;
        const result = await db.query(INSERT_AUCTION, [name, description, seller_id, status_id, img_id]);
        return result.rows[0];
    }

    async getAuctionsBySellerId(db, sellerId) {
        const result = await db.query(SELECT_AUCTION_BY_SELLER_ID, [sellerId])
        return result.rows
    }

    async getAuctionById(db, id) {
        const result = await db.query(SELECT_AUCTION_BY_ID, [id])
        return getRowsOrThrowException(result, "Can't find auction by id")[0]
    }

    async getAuctionStatuses(db) {
        try {
            const result = await db.query(SELECT_ALL_AUCTION_STATUS)
            return result.rows
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getOnlyAuctionCreateStatus(db) {
        try {
            const result = await db.query(SELECT_ONLY_AUCTION_CREATE_STATUS)
            return result.rows
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateAuction(db, form) {
        const {auction_id, auction_name, auction_description, auction_status_id, new_img_id} = form

        const sqlQuery = new_img_id
            ? UPDATE_AUCTION_BY_ID
            : UPDATE_AUCTION_BY_ID_WITHOUT_IMG;

        const values = [
            auction_name,
            auction_description,
            +auction_status_id,
            ...(new_img_id ? [new_img_id] : []),
            auction_id
        ];

        const result = await db.query(sqlQuery, values);
        const auction = result.rows[0];
        if (!auction) {
            throw new Error("Can't update auction")
        }
        return auction
    }

    async deleteAuction(db, auction_id) {
        const result = await db.query(DELETE_AUCTION_BY_ID, [auction_id])
        return getRowsOrThrowException(result, "Not delete auction")[0]
    }

    async getAllAuctions(db) {
        const result = await db.query(SELECT_ALL_AUCTION)
        return result.rows
    }
}

export default new AuctionService()