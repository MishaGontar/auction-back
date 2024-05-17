import {
    DELETE_LOT_BY_ID,
    INSERT_LOT,
    INSERT_WINNER_LOT,
    SELECT_AUCTION_LOTS,
    SELECT_LOT_BY_ID,
    SELECT_LOT_IMAGES_BY_LOT_ID,
    SELECT_WINNER_BY_LOT_ID,
    UPDATE_LOT_BY_ID,
    UPDATE_LOT_STATUS
} from "../../databaseSQL/lot/LotSqlQuery.js";
import {getRowsOrThrowException} from "../../utils.js";
import ImageService from "../image/ImageService.js";
import LotBetService from "./LotBetService.js";

class LotService {
    async createLot(db, data) {
        if (!data.name || !data.description || !data.seller_id || !data.auction_id || !data.status_id || !data.amount) {
            throw new Error('Missing required fields');
        }
        const result = await db.query(INSERT_LOT, [
            data.name,
            data.description,
            +data.seller_id,
            +data.auction_id,
            +data.status_id,
            +data.amount,
            data.bank_card_number ?? null,
            data.monobank_link ?? null
        ])

        return getRowsOrThrowException(result, "Can't create lot")[0]
    }

    async getAuctionLots(db, auction_id) {
        if (!auction_id) {
            throw new Error('Missing required fields');
        }
        const result = await db.query(SELECT_AUCTION_LOTS, [auction_id])
        return result.rows
    }

    async getLotById(db, lot_id) {
        if (!lot_id) {
            throw new Error('Missing required fields');
        }
        const result = await db.query(SELECT_LOT_BY_ID, [lot_id])
        return getRowsOrThrowException(result, "Not found lot")[0]
    }

    async getLotImagesByLotId(db, lot_id) {
        if (!lot_id) {
            throw new Error('Missing required fields');
        }
        const result = await db.query(SELECT_LOT_IMAGES_BY_LOT_ID, [lot_id])
        return getRowsOrThrowException(result, "Not found lot")
    }


    async deleteLot(db, lot_id) {
        if (!lot_id) {
            throw new Error('Missing required fields');
        }
        await ImageService.deleteImagesByLotId(db, lot_id)
        const lot_delete_result = await db.query(DELETE_LOT_BY_ID, [lot_id])
        if (lot_delete_result.rows.length === 0) {
            console.error(`Can't delete lot ${lot_id}`)
        }
        return lot_delete_result.rows[0]
    }

    async isLotOwner(req, lotId) {
        const lot = await this.getLotById(req.db, lotId)

        if (req.user.seller_id !== lot.seller_id) {
            throw new Error("You are not a owner!")
        }
    }

    async createWinner(db, lotId) {
        if (!lotId) {
            throw new Error('Missing required fields');
        }
        const bets = await LotBetService.getLotBetsByLotId(db, lotId)
        const winnerResult = await db.query(INSERT_WINNER_LOT, [lotId, bets[0].bet_id]);
        return getRowsOrThrowException(winnerResult, "Not created winner")[0]
    }

    async getWinnerByLotId(db, lotId) {
        if (!lotId) {
            throw new Error('Missing required fields');
        }
        const result = await db.query(SELECT_WINNER_BY_LOT_ID, [lotId])
        return result.rows
    }

    async updateLotStatus(db, lotId, status_id) {
        if (!lotId || !status_id) {
            throw new Error('Missing required fields');
        }
        await db.query(UPDATE_LOT_STATUS, [lotId, status_id])
    }

    async finishLot(db, lotId) {
        await this.createWinner(db, lotId)
        await this.updateLotStatus(db, lotId, 4)
    }

    async updateLotById(db, data) {
        if (!data.name || !data.description || !data.status_id) {
            throw new Error('Missing required fields');
        }

        const result = await db.query(UPDATE_LOT_BY_ID, [
            data.lotId,
            data.name,
            data.description,
            +data.status_id,
            data.monobank_link ?? null,
            data.bank_card_number ?? null
        ])

        return getRowsOrThrowException(result, "Can't update lot")[0]
    }

    async getOtherWinnerIfExist(db, lotId) {
        if (!lotId) {
            throw new Error('Missing required fields');
        }
        const existWinner = await this.getWinnerByLotId(db, lotId)
        if (existWinner) {

        }
    }
}

export default new LotService()